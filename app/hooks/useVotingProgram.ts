'use client';

import { useEffect, useState } from 'react';
import { useAnchorWallet, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Program, AnchorProvider, BN, Idl } from '@project-serum/anchor';
import { SystemProgram } from '@solana/web3.js';
import { PollAccount, CandidateAccount, StatusMessage } from '@/app/models/types';
import { PROGRAM_ID, NETWORK, ENDPOINT } from '@/app/utils/constants';
import { getPollPDA, getCandidatePDA, getVoterRecordPDA } from '@/app/utils/pdas';

// Import the IDL - adjust the path as needed
import idlFile from '../../target/idl/solana_voting_app.json';

// Function to adapt the IDL to the format Anchor expects
const adaptIdl = (rawIdl: any): Idl => {
  // Create a basic Idl structure that Anchor can work with
  const adaptedIdl: Idl = {
    version: rawIdl.metadata?.version || "0.1.0",
    name: rawIdl.metadata?.name || "solana_voting_app",
    instructions: rawIdl.instructions || [],
    accounts: [],
    types: []
  };

  // Process accounts
  if (rawIdl.accounts) {
    adaptedIdl.accounts = rawIdl.accounts.map((account: any) => {
      return {
        name: account.name,
        type: {
          kind: "struct",
          fields: []
        }
      };
    });
  }

  // Process types if they exist
  if (rawIdl.types) {
    adaptedIdl.types = rawIdl.types.map((type: any) => {
      // If the type already has a proper structure, use it
      if (type.type?.kind === "struct" && type.type?.fields) {
        return type;
      }

      // Otherwise create a minimal type definition
      return {
        name: type.name,
        type: {
          kind: "struct",
          fields: []
        }
      };
    });
  }

  // Add errors if they exist
  if (rawIdl.errors) {
    adaptedIdl.errors = rawIdl.errors;
  }

  return adaptedIdl;
};

export const useVotingProgram = () => {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const wallet = useAnchorWallet();

  const [program, setProgram] = useState<Program | null>(null);
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
          await connection.getLatestBlockhash();
          console.log("Successfully connected to Solana network");
          setNetworkMismatch(false);
        } catch (err) {
          console.error("Network connection error:", err);
          setNetworkMismatch(true);
          setStatus({
            message: `Connection to ${NETWORK} failed. Please check your wallet and network settings.`,
            isError: true
          });
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

        // Create provider
        const provider = new AnchorProvider(
          connection,
          wallet,
          {
            commitment: 'confirmed',
            preflightCommitment: 'confirmed',
            skipPreflight: false
          }
        );

        try {
          // Adapt the IDL to the format Anchor expects
          console.log("Adapting IDL to Anchor format");
          const adaptedIdl = adaptIdl(idlFile);

          const programInstance = new Program(
            adaptedIdl,
            PROGRAM_ID,
            provider
          );

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
      const pollAccounts = await program.account.poll.all();
      console.log("Raw poll accounts:", pollAccounts);

      // Transform the data
      return pollAccounts.map(item => {
        const account = item.account as any;
        return {
          publicKey: item.publicKey,
          account: {
            pollId: new BN(account.pollId?.toString() || account.poll_id?.toString() || '0'),
            description: account.description || '',
            pollStartTime: new BN(account.pollStartTime?.toString() || account.poll_start_time?.toString() || '0'),
            pollEndTime: new BN(account.pollEndTime?.toString() || account.poll_end_time?.toString() || '0'),
            candidateAmount: account.candidateAmount || account.candidate_amount || 0
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
      // Fetch all candidates
      const allCandidates = await program.account.candidate.all();
      console.log("Raw candidate accounts:", allCandidates);

      // Transform the candidates
      return allCandidates.map(item => {
        const account = item.account as any;
        return {
          publicKey: item.publicKey,
          account: {
            candidateName: account.candidateName || account.candidate_name || '',
            candidateVotes: new BN(account.candidateVotes?.toString() || account.candidate_votes?.toString() || '0')
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

  // Create a new poll
  const createPoll = async (description: string): Promise<boolean> => {
    if (!program || !wallet) return false;

    setLoading(true);
    setStatus(null);

    try {
      // Generate a unique poll ID using current timestamp
      const pollId = new BN(Date.now());

      // Set poll duration - from now to 7 days in the future
      const now = Math.floor(Date.now() / 1000);
      const oneWeekFromNow = now + (7 * 24 * 60 * 60);

      // Get the PDA for the poll
      const pollPDA = getPollPDA(pollId);

      console.log("Creating poll with PDA:", pollPDA.toString());
      console.log("Parameters:", {
        pollId: pollId.toString(),
        description,
        startTime: now,
        endTime: oneWeekFromNow
      });

      // Log available methods to debug
      console.log("Available methods:", Object.keys(program.methods));

      // Try to find the correct method name
      const methodName = Object.keys(program.methods).find(
        name => name.toLowerCase() === 'initialize_poll' || name === 'initializePoll'
      );

      if (!methodName) {
        throw new Error('initialize_poll method not found in program');
      }

      console.log("Using method name:", methodName);

      // Use the found method name
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
        .rpc({ skipPreflight: true })
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

      if (err.toString().includes('429')) {
        setStatus({
          message: 'Network is busy. Please try again in a few moments.',
          isError: true
        });
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

      // Use snake_case method name
      const tx = await program.methods
        .initialize_candidate(
          pollId,
          candidateName
        )
        .accounts({
          signer: wallet.publicKey,
          poll: pollPDA,
          candidate: candidatePDA,
          system_program: SystemProgram.programId,
        })
        .rpc();

      console.log("Candidate added! Transaction signature:", tx);

      setStatus({
        message: 'Candidate added successfully!',
        isError: false
      });
      return true;
    } catch (err) {
      console.error('Error adding candidate:', err);

      if (err.toString().includes('429')) {
        setStatus({
          message: 'Network is busy. Please try again in a few moments.',
          isError: true
        });
      } else {
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

      // Call the vote instruction with snake_case field names
      const tx = await program.methods
        .vote(
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
        .rpc();

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

  return {
    program,
    loading,
    status,
    fetchPolls,
    fetchCandidates,
    createPoll,
    addCandidate,
    vote,
    networkMismatch
  };
};

export default useVotingProgram;