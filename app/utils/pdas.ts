import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';
import { PROGRAM_ID } from './constants';

// Get Poll PDA
export const getPollPDA = (pollId: BN): PublicKey => {
  const pollIdBuffer = pollId.toArrayLike(Buffer, 'le', 8);
  const [pda] = PublicKey.findProgramAddressSync(
    [pollIdBuffer],
    PROGRAM_ID
  );
  return pda;
};

// Get Candidate PDA
export const getCandidatePDA = (pollId: BN, candidateName: string): PublicKey => {
  const pollIdBuffer = pollId.toArrayLike(Buffer, 'le', 8);
  const [pda] = PublicKey.findProgramAddressSync(
    [pollIdBuffer, Buffer.from(candidateName)],
    PROGRAM_ID
  );
  return pda;
};

// Get Voter Record PDA
export const getVoterRecordPDA = (
  pollId: BN, 
  candidateName: string, 
  voterPubkey: PublicKey
): PublicKey => {
  const pollIdBuffer = pollId.toArrayLike(Buffer, 'le', 8);
  const [pda] = PublicKey.findProgramAddressSync(
    [pollIdBuffer, Buffer.from(candidateName), voterPubkey.toBuffer()],
    PROGRAM_ID
  );
  return pda;
};