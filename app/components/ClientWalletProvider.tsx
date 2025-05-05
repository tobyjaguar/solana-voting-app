'use client';

import { ReactNode, useState, useEffect } from 'react';
import { WalletContextProvider } from './WalletContextProvider';

export default function ClientWalletProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading wallet...
      </div>
    );
  }
  
  return <WalletContextProvider>{children}</WalletContextProvider>;
}