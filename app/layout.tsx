// layout.tsx (server component)
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientWalletProvider from '@/app/components/ClientWalletProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Solana Dev Meetup Voting App',
  description: 'Vote on Solana project ideas for your next dev meetup',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900`}>
        <ClientWalletProvider>
          <div style={{maxWidth: '1200px', margin: '0 auto', padding: '20px'}}>
            {children}
          </div>
        </ClientWalletProvider>
      </body>
    </html>
  );
}