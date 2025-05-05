import { PublicKey } from '@solana/web3.js';
import { BN } from '@project-serum/anchor';

// Poll account data structure
export interface Poll {
  pollId: BN;
  description: string;
  pollStartTime: BN;
  pollEndTime: BN;
  candidateAmount: BN;
}

// Candidate account data structure
export interface Candidate {
  candidateName: string;
  candidateVotes: BN;
}

// Full Poll data with its public key
export interface PollAccount {
  publicKey: PublicKey;
  account: Poll;
}

// Full Candidate data with its public key
export interface CandidateAccount {
  publicKey: PublicKey;
  account: Candidate;
}

// Status message type
export interface StatusMessage {
  message: string;
  isError: boolean;
}