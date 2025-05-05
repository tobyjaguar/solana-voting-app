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
    <main className="flex min-h-screen flex-col py-8 bg-slate-900 text-white">
      <div className="w-full max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-6 border-b border-slate-700">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0 bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
            Solana Dev Meetup Voting
          </h1>
          <WalletMultiButton />
        </header>
        
        <div className="mb-8">
          {publicKey ? (
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading && polls.length === 0 ? (
              <div className="col-span-full text-center py-8 text-slate-400">
                Loading polls...
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
              <div className="col-span-full text-center py-8 text-slate-400">
                No polls found. Create one to get started!
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}