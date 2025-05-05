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
      <body className={inter.className}>
        <ClientWalletProvider>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </ClientWalletProvider>
      </body>
    </html>
  );
}