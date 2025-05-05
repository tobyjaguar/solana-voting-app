import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaVotingApp } from "../target/types/solana_voting_app";
import { expect } from "chai";
import { BN } from "bn.js";

describe("solanaVotingApp", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaVotingApp as Program<SolanaVotingApp>;
  const wallet = provider.wallet;

  // Common variables to use across all tests
  const pollId = new BN(1);
  const description = "Test Poll";
  // Set the start time to the past (3 hours ago) to ensure the poll has started
  const pollStartTime = new BN(Math.floor(Date.now() / 1000) - 10800); 
  const pollEndTime = new BN(Math.floor(Date.now() / 1000) + 86400); // 1 day from now
  const candidateName = "Candidate A";
  let pollPda, candidatePda;

  // Setup before all tests run
  before(async () => {
    // Derive PDA addresses
    [pollPda] = anchor.web3.PublicKey.findProgramAddressSync(
      [pollId.toBuffer('le', 8)],
      program.programId
    );

    [candidatePda] = anchor.web3.PublicKey.findProgramAddressSync(
      [pollId.toBuffer('le', 8), Buffer.from(candidateName)],
      program.programId
    );

    // Initialize the poll with a start time in the past
    try {
      await program.methods
        .initializePoll(pollId, description, pollStartTime, pollEndTime)
        .accounts({
          signer: wallet.publicKey,
          poll: pollPda,
          systemProgram: anchor.web3.SystemProgram.programId,
        })
        .rpc();
      console.log("Poll initialized successfully");
    } catch (e) {
      // If the poll already exists, that's fine - we'll continue
      console.log("Poll may already exist:", e.message);
    }
  });

  it("Can initialize a poll", async () => {
    // Fetch the poll account
    const pollAccount = await program.account.poll.fetch(pollPda);
    console.log("Poll Account: ", pollAccount);

    // Assertions to verify the poll was initialized correctly
    expect(pollAccount.pollId.toString()).to.equal(pollId.toString());
    expect(pollAccount.description).to.equal(description);
    expect(pollAccount.pollStartTime.toString()).to.equal(
      pollStartTime.toString()
    );  
    expect(pollAccount.pollEndTime.toString()).to.equal(
      pollEndTime.toString()
    );
    expect(pollAccount.candidateAmount.toString()).to.equal("0");
  });

  it("Can initialize a candidate", async () => {
    // Call the initializeCandidate function
    await program.methods
      .initializeCandidate(pollId, candidateName)
      .accounts({
        signer: wallet.publicKey,
        poll: pollPda,
        candidate: candidatePda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();

    // Fetch the candidate account
    const candidateAccount = await program.account.candidate.fetch(candidatePda);
    console.log("Candidate Account: ", candidateAccount);

    // Assertions to verify the candidate was initialized correctly
    expect(candidateAccount.candidateName).to.equal(candidateName);
    expect(candidateAccount.candidateVotes.toString()).to.equal("0");
  });

  it("Can vote for a candidate", async () => {
    // Call the vote function
    await program.methods
      .vote(pollId, candidateName)
      .accounts({
        signer: wallet.publicKey,
        poll: pollPda,
        candidate: candidatePda,
      })
      .rpc();

    // Fetch the candidate account again
    const candidateAccount = await program.account.candidate.fetch(candidatePda);
    console.log("Candidate Account after voting: ", candidateAccount);

    // Assertions to verify the vote was counted correctly
    expect(candidateAccount.candidateVotes.toString()).to.equal("1");
  });
});