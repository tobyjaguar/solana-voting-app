'use client';

import { useEffect, useState } from 'react';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, BN, Idl } from '@coral-xyz/anchor';
import { SystemProgram } from '@solana/web3.js';
import { PollAccount, CandidateAccount, StatusMessage } from '@/app/models/types';
import { PROGRAM_ID, NETWORK, ENDPOINT } from '@/app/utils/constants';
import { getPollPDA, getCandidatePDA, getVoterRecordPDA } from '@/app/utils/pdas';

// Import the IDL directly
import idlFile from '../idl/solana_voting_app.json';

export const useVotingProgram = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const wallet = useAnchorWallet();

  const [program, setProgram] = useState<Program<Idl> | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusMessage | null>(null);
  const [networkMismatch, setNetworkMismatch] = useState(false);

  // Network check
  useEffect(() => {
    const checkNetwork = async () => {
      if (!wallet || !connected) {
        setStatus({
          message: "Please connect your wallet",
          isError: false
        });
        return;
      }

      try {
        console.log(`Expected network: ${NETWORK}, endpoint: ${ENDPOINT}`);

        try {
          // Check if the Solana validator is running
          const blockHash = await connection.getLatestBlockhash();
          console.log("Successfully connected to Solana network");
          console.log("Latest blockhash:", blockHash.blockhash);
          
          // Additional check to verify validator responsiveness
          const balance = await connection.getBalance(publicKey);
          console.log("Wallet balance:", balance / 1000000000, "SOL");
          
          setNetworkMismatch(false);
        } catch (err) {
          console.error("Network connection error:", err);
          setNetworkMismatch(true);
          
          // Type-safe network error messages based on network type
          switch (NETWORK) {
            case 'localnet':
              setStatus({
                message: `Connection to localnet failed. Make sure your local Solana validator is running with "solana-test-validator".`,
                isError: true
              });
              break;
            case 'devnet':
              setStatus({
                message: `Connection to devnet failed. The Solana devnet may be experiencing issues or your wallet is not configured for devnet.`,
                isError: true
              });
              break;
            case 'testnet':
              setStatus({
                message: `Connection to testnet failed. The Solana testnet may be experiencing issues or your wallet is not configured for testnet.`,
                isError: true
              });
              break;
            case 'mainnet-beta':
              setStatus({
                message: `Connection to mainnet-beta failed. Please check your wallet and network settings.`,
                isError: true
              });
              break;
            default:
              setStatus({
                message: `Connection to ${NETWORK} failed. Please check your wallet and network settings.`,
                isError: true
              });
          }
        }
      } catch (err) {
        console.error("Network check error:", err);
      }
    };

    if (connected) {
      checkNetwork();
    }
  }, [connection, wallet, connected, publicKey]);

  // Program initialization
  useEffect(() => {
    const initializeProgram = async () => {
      if (!wallet || networkMismatch) {
        setProgram(null);
        return;
      }

      try {
        console.log("Initializing program with wallet:", wallet.publicKey.toString());
        console.log("Program ID:", PROGRAM_ID.toString());

        // Create provider with more lenient settings for local development
        const provider = new AnchorProvider(
          connection,
          wallet,
          {
            commitment: 'processed',
            preflightCommitment: 'processed',
            skipPreflight: true
          }
        );
        
        // Log connection and wallet info for debugging
        console.log("Connection endpoint:", connection.rpcEndpoint);
        console.log("Wallet public key:", wallet.publicKey.toString());

        try {
          const programInstance = new Program(
            idlFile as Idl,
            provider
          );

          // Log available methods to verify structure
          console.log("Available accounts:", Object.keys(programInstance.account));
          console.log("Available methods:", Object.keys(programInstance.methods));
          
          console.log("Program initialized successfully");
          setProgram(programInstance);
          setStatus({
            message: "Connected to Solana program",
            isError: false
          });
        } catch (err) {
          console.error("Error initializing program:", err);
          throw new Error(`Program initialization failed: ${err}`);
        }
      } catch (err) {
        console.error('Failed to initialize program:', err);
        setStatus({
          message: `Failed to initialize program: ${err}`,
          isError: true
        });
      }
    };

    initializeProgram();
  }, [connection, wallet, networkMismatch]);

  // Fetch all polls
  const fetchPolls = async (): Promise<PollAccount[]> => {
    if (!program) return [];

    setLoading(true);
    setStatus(null);

    try {
      // Fetch all poll accounts
      console.log("Fetching all poll accounts...");
      console.log('Available accounts:', Object.keys(program.account));
      
      // First check if the account name is capitalized (Poll) or lowercase (poll)
      const pollAccountName = Object.keys(program.account).find(
        name => name.toLowerCase() === 'poll'
      );
      
      if (!pollAccountName) {
        throw new Error("Poll account not found in program");
      }
      
      const pollAccounts = await program.account[pollAccountName].all();
      console.log("Raw poll accounts:", pollAccounts);

      // Transform the data
      return pollAccounts.map((item: any) => {
        const account = item.account as any;
        return {
          publicKey: item.publicKey,
          account: {
            pollId: new BN(account.poll_id?.toString() || account.pollId?.toString() || '0'),
            description: account.description || '',
            pollStartTime: new BN(account.poll_start_time?.toString() || account.pollStartTime?.toString() || '0'),
            pollEndTime: new BN(account.poll_end_time?.toString() || account.pollEndTime?.toString() || '0'),
            candidateAmount: account.candidate_amount || account.candidateAmount || 0
          }
        };
      });
    } catch (err) {
      console.error('Error fetching polls:', err);
      setStatus({
        message: `Failed to fetch polls: ${err}`,
        isError: true
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Fetch candidates for a specific poll
  const fetchCandidates = async (pollId: BN): Promise<CandidateAccount[]> => {
    if (!program) return [];
  
    setLoading(true);
    setStatus(null);
  
    try {
      // Find the candidate account name
      const candidateAccountName = Object.keys(program.account).find(
        name => name.toLowerCase() === 'candidate'
      );
      
      if (!candidateAccountName) {
        throw new Error("Candidate account not found in program");
      }
      
      // Get all candidates
      const allCandidates = await program.account[candidateAccountName].all();
      
      // Filter candidates using PDA derivation logic
      const filteredCandidates = [];
      for (const candidate of allCandidates) {
        const candidateName = candidate.account.candidate_name || candidate.account.candidateName;
        if (!candidateName) continue;
        
        // Derive the expected PDA for this poll and candidate name
        const expectedPDA = getCandidatePDA(pollId, candidateName);
        
        // If the PDAs match, this candidate belongs to this poll
        if (expectedPDA.toString() === candidate.publicKey.toString()) {
          filteredCandidates.push(candidate);
        }
      }
      
      console.log(`Found ${filteredCandidates.length} candidates for poll ${pollId.toString()}`);
  
      // Transform the filtered candidates
      return filteredCandidates.map(item => {
        const account = item.account as any;
        return {
          publicKey: item.publicKey,
          account: {
            candidateName: account.candidate_name || account.candidateName || '',
            candidateVotes: new BN(account.candidate_votes?.toString() || account.candidateVotes?.toString() || '0')
          }
        };
      });
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setStatus({
        message: `Failed to fetch candidates: ${err}`,
        isError: true
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Create a new poll with optional retry for seed constraint errors
  const createPoll = async (description: string, retryCount = 0): Promise<boolean> => {
    if (!program || !wallet) return false;
    // Limit retries to avoid infinite loops
    if (retryCount > 3) {
      setStatus({
        message: 'Failed to create poll after multiple attempts. Please try again later.',
        isError: true
      });
      return false;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Generate a unique poll ID using current timestamp + random suffix to avoid collisions
      const timestamp = Date.now().toString();
      // Add a small random number to ensure uniqueness, especially on retries
      const randomSuffix = retryCount > 0 ? Math.floor(Math.random() * 1000) : 0;
      const pollIdStr = timestamp + randomSuffix;
      console.log(`Using poll ID (attempt ${retryCount + 1}):`, pollIdStr);
      const pollId = new BN(pollIdStr);
      
      // Log the BN value and its buffer representation to debug seed issues
      console.log("Poll ID as BN:", pollId.toString());
      console.log("Poll ID as Buffer:", pollId.toArrayLike(Buffer, 'le', 8).toString('hex'));

      // Set poll duration - set start time to 2 minutes in the past to ensure it's active
      // This ensures the poll is active immediately when created and accounts for any
      // potential clock skew between client and blockchain validator
      // const now = Math.floor(Date.now() / 1000) - 172800; // 48 hours in the past
      // console.log("Poll start time (48 hours in the past):", now);
      const now = Math.floor(Date.now() / 1000) - 3600; // try to create the poll 1 hour in the past
      console.log("Poll start time (1 hour in the past):", now);
      
      // End time is one week from current time
      const oneWeekFromNow = Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60);
      console.log("Poll end timestamp:", oneWeekFromNow);

      // Get the PDA for the poll
      const pollPDA = getPollPDA(pollId);

      console.log("Creating poll with PDA:", pollPDA.toString());
      console.log("Parameters:", {
        pollId: pollId.toString(),
        description,
        startTime: now,
        endTime: oneWeekFromNow
      });

      // Check available method names
      const availableMethods = Object.keys(program.methods);
      console.log("Available methods:", availableMethods);
      
      // Determine the correct method name (snake_case or camelCase)
      const methodName = availableMethods.find(
        name => name === 'initialize_poll' || name === 'initializePoll'
      );
      
      if (!methodName) {
        throw new Error("Initialize poll method not found in program");
      }
      
      console.log(`Using method: ${methodName}`);

      // First, simulate the transaction to get detailed error information
      try {
        const simulation = await program.methods[methodName](
          pollId,
          description,
          new BN(now),
          new BN(oneWeekFromNow)
        )
          .accounts({
            signer: wallet.publicKey,
            poll: pollPDA,
            system_program: SystemProgram.programId,
          })
          .simulate();
        
        console.log("Simulation successful:", simulation);
      } catch (simErr) {
        console.error("Simulation error:", simErr);
        // Log but continue to try the actual transaction
      }
      
      // Use the correct method name for the actual transaction
      const tx = await program.methods[methodName](
        pollId,
        description,
        new BN(now),
        new BN(oneWeekFromNow)
      )
        .accounts({
          signer: wallet.publicKey,
          poll: pollPDA,
          system_program: SystemProgram.programId,
        })
        .rpc({ 
          skipPreflight: true,
          commitment: 'processed',
          maxRetries: 5,
        })
        .catch(err => {
          console.error("Detailed error:", err);
          if (err.logs) {
            console.error("Transaction logs:", err.logs);
          }
          throw err;
        });

      console.log("Poll created! Transaction signature:", tx);

      setStatus({
        message: 'Poll created successfully!',
        isError: false
      });
      return true;
    } catch (err) {
      console.error('Error creating poll:', err);
      
      // Log more details about the error to assist with debugging
      if (err instanceof Error) {
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
      }
      
      if (err.toString().includes('429')) {
        setStatus({
          message: 'Network is busy. Please try again in a few moments.',
          isError: true
        });
      } else if (err.toString().includes('Not found')) {
        setStatus({
          message: 'Method not found in program. Check IDL structure and method name.',
          isError: true
        });
      } else if (err.toString().includes('seed constraint was violated') || err.toString().includes('seeds constraint')) {
        // Handle seed constraint violations - this happens when a poll with the same ID already exists
        console.error("Seed constraint violation - poll ID already exists");
        
        // Automatically retry with a different poll ID
        console.log(`Retrying with a new poll ID (attempt ${retryCount + 1})`);
        setLoading(false);
        return createPoll(description, retryCount + 1);
        
      } else if (err.toString().includes('TransactionExpiredTimeoutError')) {
        // For local validator, the transaction might still have succeeded despite the timeout
        setStatus({
          message: 'Transaction timed out but may have succeeded. Check "fetchPolls" to verify, or try again.',
          isError: true
        });
        
        // Try to fetch polls to see if the operation succeeded despite timeout
        setTimeout(() => {
          fetchPolls().then(polls => {
            if (polls.length > 0) {
              console.log("Found polls after timeout, transaction might have succeeded:", polls);
              setStatus({
                message: 'Poll may have been created successfully despite timeout. See poll list.',
                isError: false
              });
            }
          });
        }, 3000);
      } else {
        setStatus({
          message: `Failed to create poll: ${err}`,
          isError: true
        });
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Add a candidate to a poll
  const addCandidate = async (pollId: BN, candidateName: string): Promise<boolean> => {
    if (!program || !wallet) return false;

    setLoading(true);
    setStatus(null);

    try {
      // Get the PDAs
      const pollPDA = getPollPDA(pollId);
      const candidatePDA = getCandidatePDA(pollId, candidateName);

      console.log("Adding candidate to poll:", pollPDA.toString());
      console.log("Candidate PDA:", candidatePDA.toString());
      console.log("Parameters:", {
        pollId: pollId.toString(),
        candidateName
      });

      // Check available method names
      const availableMethods = Object.keys(program.methods);
      
      // Determine the correct method name (snake_case or camelCase)
      const methodName = availableMethods.find(
        name => name === 'initialize_candidate' || name === 'initializeCandidate'
      );
      
      if (!methodName) {
        throw new Error("Initialize candidate method not found in program");
      }
      
      console.log(`Using method: ${methodName}`);

      // Skip simulation as it's causing issues
      // Directly try the transaction with error handling
      console.log("Fetching poll account first to check poll timing");
      try {
        // Find the proper account name (could be Poll or poll)
        const pollAccountName = Object.keys(program.account).find(
          name => name.toLowerCase() === 'poll'
        );
        
        if (!pollAccountName) {
          throw new Error("Poll account not found in program");
        }
        
        // Use the poll account to check if the poll has started and hasn't ended
        const pollAccount = await program.account[pollAccountName].fetch(pollPDA);
        console.log("Poll account:", pollAccount);
        
        // Check poll timing manually - using on-chain data
        const now = Math.floor(Date.now() / 1000);
        const startTime = new BN(pollAccount.poll_start_time?.toString() || pollAccount.pollStartTime?.toString() || '0');
        const endTime = new BN(pollAccount.poll_end_time?.toString() || pollAccount.pollEndTime?.toString() || '0');
        
        console.log(`Current time: ${now}`);
        console.log(`Poll start time: ${startTime.toString()}`);
        console.log(`Poll end time: ${endTime.toString()}`);
        console.log(`Time until poll starts: ${startTime.sub(new BN(now)).toString()} seconds`);
        
        // Add safety buffer to account for possible clock difference between client and blockchain
        // Check if poll hasn't started yet (with 60 second buffer)
        if (startTime.gt(new BN(now + 60))) {
          throw new Error(`Poll starts in ${startTime.sub(new BN(now)).toString()} seconds. Please wait.`);
        }
        
        // Check if poll has ended (with 60 second buffer)
        if (endTime.lt(new BN(now - 60))) {
          throw new Error("Poll has already ended.");
        }
      } catch (fetchErr) {
        console.error("Error fetching poll account:", fetchErr);
        // If we can't fetch the poll, continue with the transaction
        // and let the on-chain program handle the validation
      }
      
      // Use the correct method name with proper RPC configuration
      console.log("Executing transaction...");
      try {
        const tx = await program.methods[methodName](
          pollId,
          candidateName
        )
          .accounts({
            signer: wallet.publicKey,
            poll: pollPDA,
            candidate: candidatePDA,
            system_program: SystemProgram.programId,
          })
          .rpc({ 
            skipPreflight: false, // Changed to false for better error messages
            commitment: 'confirmed', // Changed to confirmed for more reliability
          })
          .catch(err => {
            console.error("Transaction execution error:", err);
            // Extract logs for better error diagnosis
            if (err.logs) {
              console.error("Transaction logs:", err.logs.join('\n'));
            }
            throw err;
          });
          
        console.log("Candidate added! Transaction signature:", tx);
        
        setStatus({
          message: 'Candidate added successfully!',
          isError: false
        });
        
        return true;
      } catch (txErr) {
        console.error("Transaction failed:", txErr);
        // Check for AnchorError with specific error codes
        if (txErr.toString().includes("PollNotStarted") || 
            txErr.toString().includes("custom program error: 0x1770")) {
          throw new Error("Poll has not started yet according to blockchain time. Try again in a few minutes.");
        } else if (txErr.toString().includes("PollEnded") || 
                  txErr.toString().includes("custom program error: 0x1771")) {
          throw new Error("Poll has already ended according to blockchain time.");
        } else if (txErr.toString().includes("seeds constraint were violated") ||
                  txErr.toString().includes("already in use")) {
          throw new Error("A candidate with this name already exists in this poll.");
        } else {
          console.error("Detailed error:", txErr);
          throw txErr;
        }
      }
    } catch (err) {
      console.error('Error adding candidate:', err);

      if (err.toString().includes('429')) {
        setStatus({
          message: 'Network is busy. Please try again in a few moments.',
          isError: true
        });
      } else if (err.toString().includes('PollNotStarted') || 
                err.toString().includes('not started yet') ||
                err.toString().includes('custom program error: 0x1770')) {
        // Handle poll not started error
        setStatus({
          message: 'This poll has not started yet according to blockchain time. Please try again in a few minutes.',
          isError: true
        });
      } else if (err.toString().includes('PollEnded') || 
                err.toString().includes('already ended') ||
                err.toString().includes('custom program error: 0x1771')) {
        // Handle poll ended error
        setStatus({
          message: 'This poll has already ended. No more candidates can be added.',
          isError: true
        });
      } else if (err.toString().includes('seeds constraint') || err.toString().includes('already in use')) {
        // Handle duplicate candidate name
        setStatus({
          message: 'A candidate with this name already exists. Please choose a different name.',
          isError: true
        });
      } else if (err.toString().includes('insufficient funds')) {
        setStatus({
          message: 'Insufficient funds to add candidate. Make sure your wallet has enough SOL.',
          isError: true
        });
      } else {
        // Log detailed error information
        if (err instanceof Error) {
          console.error('Error details:', {
            message: err.message,
            stack: err.stack,
            name: err.name
          });
        }
        
        setStatus({
          message: `Failed to add candidate: ${err}`,
          isError: true
        });
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Vote for a candidate
  const vote = async (pollId: BN, candidateName: string): Promise<boolean> => {
    if (!program || !wallet) return false;

    setLoading(true);
    setStatus(null);

    try {
      // Get the PDAs
      const pollPDA = getPollPDA(pollId);
      const candidatePDA = getCandidatePDA(pollId, candidateName);
      const voterRecordPDA = getVoterRecordPDA(pollId, candidateName, wallet.publicKey);

      console.log("Voting in poll:", pollPDA.toString());
      console.log("For candidate:", candidatePDA.toString());
      console.log("Voter record PDA:", voterRecordPDA.toString());
      console.log("Parameters:", {
        pollId: pollId.toString(),
        candidateName
      });

      // Check available method names for consistency
      const availableMethods = Object.keys(program.methods);
      const voteMethodName = availableMethods.find(
        name => name === 'vote'  // vote should be the same in both cases
      );
      
      if (!voteMethodName) {
        throw new Error("Vote method not found in program");
      }
      
      console.log(`Using vote method: ${voteMethodName}`);
      console.log(`Voter record PDA: ${voterRecordPDA.toString()}`);
      
      // Use the vote method with proper RPC configuration
      const tx = await program.methods[voteMethodName](
        pollId,
        candidateName
      )
        .accounts({
          signer: wallet.publicKey,
          poll: pollPDA,
          candidate: candidatePDA,
          voter_record: voterRecordPDA,
          system_program: SystemProgram.programId,
        })
        .rpc({ 
          skipPreflight: true,
          commitment: 'processed',
          maxRetries: 5
        });

      console.log("Vote recorded! Transaction signature:", tx);

      setStatus({
        message: 'Vote recorded successfully!',
        isError: false
      });
      return true;
    } catch (err) {
      console.error('Error voting:', err);

      if (err.toString().includes('429') || err.toString().toLowerCase().includes('rate limit')) {
        setStatus({
          message: 'The network is busy. Please try again in a few seconds.',
          isError: true
        });
      } else {
        setStatus({
          message: `Failed to vote: ${err}`,
          isError: true
        });
      }

      return false;
    } finally {
      setLoading(false);
    }
  };

  // Utility function to update poll timing
  const updatePollTiming = async (pollId: BN): Promise<boolean> => {
    if (!program || !wallet) return false;

    setLoading(true);
    setStatus(null);

    try {
      // Get the PDA for the poll
      const pollPDA = getPollPDA(pollId);
      
      // Check available method names
      const availableMethods = Object.keys(program.methods);
      console.log("Available methods:", availableMethods);
      
      // See if we have an update_poll_timing method
      // This assumes a method needs to be added to the program
      const methodName = availableMethods.find(
        name => name === 'update_poll_timing' || name === 'updatePollTiming'
      );
      
      if (!methodName) {
        throw new Error("Update poll timing method not found in program. Please update your Solana program.");
      }
      
      // Set the poll start time to 2 minutes in the past
      const startTime = new BN(Math.floor(Date.now() / 1000) - 120);
      // Keep the original end time (1 week from now)
      const endTime = new BN(Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60));
      
      console.log(`Updating poll timing for poll ${pollId.toString()}:`, {
        startTime: startTime.toString(),
        endTime: endTime.toString()
      });
      
      // Call the update poll timing method
      const tx = await program.methods[methodName](
        pollId,
        startTime,
        endTime
      )
        .accounts({
          signer: wallet.publicKey,
          poll: pollPDA,
        })
        .rpc({
          skipPreflight: false,
          commitment: 'confirmed'
        });
      
      console.log("Poll timing updated! Transaction signature:", tx);
      
      setStatus({
        message: 'Poll timing updated successfully!',
        isError: false
      });
      
      return true;
    } catch (err) {
      console.error('Error updating poll timing:', err);
      
      setStatus({
        message: `Failed to update poll timing: ${err}`,
        isError: true
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    program,
    loading,
    status,
    fetchPolls,
    fetchCandidates,
    createPoll,
    addCandidate,
    vote,
    networkMismatch,
    updatePollTiming  // Export the new function
  };
};

export default useVotingProgram;