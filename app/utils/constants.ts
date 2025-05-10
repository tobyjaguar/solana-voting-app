import { PublicKey } from '@solana/web3.js';

// Your program ID from Anchor.toml or target/idl
export const PROGRAM_ID = new PublicKey('C82ywxcsy6SahTq2CvdnGsN4xN1aKeWan7VR3mDQgi8V');

// Network configuration
export const NETWORK = 'devent'; // 'devnet' or 'testnet' or 'localnet'
export const ENDPOINT = 'https://api.devnet.solana.com';
// export const ENDPOINT = 'http://localhost:8899'; // Local Solana cluster

// Validation constants
export const MAX_DESCRIPTION_LENGTH = 280;
export const MAX_CANDIDATE_NAME_LENGTH = 32;