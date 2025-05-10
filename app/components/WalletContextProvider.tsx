'use client';

import { useState, useEffect } from 'react';
import { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { NETWORK, ENDPOINT } from '@/app/utils/constants';

// Import styles
import '@solana/wallet-adapter-react-ui/styles.css';

interface WalletContextProviderProps {
  children: ReactNode;
}

export const WalletContextProvider: FC<WalletContextProviderProps> = ({ children }) => {
  // Client-side only mounting to prevent hydration errors
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map the network from constants to WalletAdapterNetwork
  const getWalletAdapterNetwork = () => {
    switch (NETWORK) {
      case 'devnet':
        return WalletAdapterNetwork.Devnet;
      case 'testnet':
        return WalletAdapterNetwork.Testnet;
      case 'mainnet-beta':
        return WalletAdapterNetwork.Mainnet;
      case 'localnet':
        return WalletAdapterNetwork.Devnet; // Use Devnet for local development
      default:
        return WalletAdapterNetwork.Devnet;
    }
  };
  
  const network = getWalletAdapterNetwork();
    
  // Use your custom endpoint or fall back to the default
  const endpoint = useMemo(() => ENDPOINT || clusterApiUrl(network), [network]);

  // Configure supported wallets
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
    ],
    [network]
  );

  // Only render children after mounting on client-side
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* Only render UI when client-side mounting is complete */}
          {mounted ? children : null}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default WalletContextProvider;