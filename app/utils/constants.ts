import { PublicKey } from '@solana/web3.js';

// Program ID from Anchor.toml or target/idl
export const PROGRAM_ID = new PublicKey('C82ywxcsy6SahTq2CvdnGsN4xN1aKeWan7VR3mDQgi8V');

// Network configuration
export type NetworkType = 'localnet' | 'devnet' | 'testnet' | 'mainnet-beta';

// Set the current network
export const NETWORK: NetworkType = 'devnet';

// Network endpoints
const ENDPOINTS: Record<NetworkType, string> = {
  localnet: 'http://localhost:8899',
  devnet: 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  'mainnet-beta': 'https://api.mainnet-beta.solana.com'
};

export const ENDPOINT = ENDPOINTS[NETWORK] || ENDPOINTS.devnet;

// Validation constants
export const MAX_DESCRIPTION_LENGTH = 280;
export const MAX_CANDIDATE_NAME_LENGTH = 32;