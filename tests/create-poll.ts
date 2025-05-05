import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SolanaVotingApp } from "../target/types/solana_voting_app";
import { expect } from "chai";

describe("solana-voting-app", () => {
  // Configure the client to use the local cluster
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaVotingApp as Program<SolanaVotingApp>;

  it("Creates a poll", async () => {
    // Generate a unique poll ID
    const pollId = new anchor.BN(Date.now());
    
    // Set poll duration
    const now = Math.floor(Date.now() / 1000);
    const oneWeekFromNow = now + (7 * 24 * 60 * 60);
    
    // Derive the PDA for the poll
    const [pollPDA] = anchor.web3.PublicKey.findProgramAddressSync(
      [pollId.toArrayLike(Buffer, 'le', 8)],
      program.programId
    );
    
    console.log('Creating poll with ID:', pollId.toString());
    console.log('Poll PDA:', pollPDA.toString());
    
    // Create the poll
    await program.methods
      .initializePoll(
        pollId,
        "What is the best pet?",
        new anchor.BN(now),
        new anchor.BN(oneWeekFromNow)
      )
      .accounts({
        signer: provider.wallet.publicKey,
        poll: pollPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    
    // Fetch the created poll to verify
    const pollAccount = await program.account.poll.fetch(pollPDA);
    console.log("Poll created:", pollAccount);
    
    expect(pollAccount.description).to.equal("What is the best pet?");
  });
});