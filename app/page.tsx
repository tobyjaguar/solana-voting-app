'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import useVotingProgram from '@/app/hooks/useVotingProgram';
import { PollAccount } from '@/app/models/types';
import CreatePollForm from '@/app/components/CreatePollForm';
import PollCard from '@/app/components/PollCard';

export default function Home() {
  const { publicKey } = useWallet();
  const { fetchPolls, loading, status } = useVotingProgram();

  const [polls, setPolls] = useState<PollAccount[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  
  // Handle responsive layout
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const checkScreenWidth = () => {
        setIsWideScreen(window.innerWidth >= 1024);
      };
      
      // Initial check
      checkScreenWidth();
      
      // Add event listener for resize
      window.addEventListener('resize', checkScreenWidth);
      
      // Cleanup
      return () => {
        window.removeEventListener('resize', checkScreenWidth);
      };
    }
  }, []);

  // Load polls when wallet connects
  const loadPolls = async () => {
    if (publicKey) {
      const fetchedPolls = await fetchPolls();
      setPolls(fetchedPolls);
    }
  };

  // Load polls on initial render and when wallet changes
  useEffect(() => {
    loadPolls();
  }, [publicKey]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingBottom: '48px', color: 'white' }}>
      <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <header style={{
          display: 'flex',
          flexDirection: isWideScreen ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: isWideScreen ? 'center' : 'flex-start',
          marginBottom: '48px',
          paddingTop: '24px',
          paddingBottom: '24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: isWideScreen ? 0 : '16px',
            background: 'linear-gradient(90deg, #c084fc, #3b82f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Solana Dev Meetup Voting
          </h1>
          <WalletMultiButton />
        </header>

        <div className="mb-8">
          {publicKey ? (
            <div className="flex justify-between items-center p-8">
              <h2 className="text-2xl text-black font-semibold">
                {polls.length > 0 ? 'Active Polls' : 'No Polls Found'}
              </h2>
              <button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg"
                onClick={() => setShowCreateForm(!showCreateForm)}
              >
                {showCreateForm ? 'Cancel' : 'Create New Poll'}
              </button>
            </div>
          ) : (
            <div className="bg-slate-800 py-12 rounded-lg flex flex-col items-center">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Solana Dev Meetup Voting</h2>
              <p className="text-center text-slate-400 mb-6 max-w-md">
                Connect your wallet to create polls and vote on project ideas for your next Solana dev meetup
              </p>
              <WalletMultiButton />
            </div>
          )}
        </div>

        {/* Status Messages */}
        {status && (
          <div className={`p-4 rounded-lg mb-6 ${status.isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`}>
            {status.message}
          </div>
        )}

        {/* Create Poll Form */}
        {showCreateForm && publicKey && (
          <div className="mb-8">
            <CreatePollForm onPollCreated={() => {
              setShowCreateForm(false);
              loadPolls();
            }} />
          </div>
        )}

        {/* Polls List */}
        {publicKey && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isWideScreen ? '1fr 1fr' : '1fr',
            gap: '32px'
          }}>
            {loading && polls.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
                <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>Loading polls...</div>
              </div>
            ) : polls.length > 0 ? (
              polls.map((poll) => (
                <PollCard
                  key={poll.publicKey.toString()}
                  poll={poll}
                  onRefresh={loadPolls}
                />
              ))
            ) : !loading && (
              <div style={{
                gridColumn: '1 / -1',
                textAlign: 'center',
                padding: '48px 0',
                backgroundColor: 'rgba(30, 41, 59, 0.5)',
                borderRadius: '8px'
              }}>
                <p style={{ color: '#94a3b8', marginBottom: '16px' }}>No polls found. Create one to get started!</p>
                <svg style={{ margin: '0 auto', height: '64px', width: '64px', color: '#64748b' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}