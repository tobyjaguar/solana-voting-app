'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import useVotingProgram from '@/app/hooks/useVotingProgram';
import { PollAccount } from '@/app/models/types';
import CreatePollForm from '@/app/components/CreatePollForm';
import PollCard from '@/app/components/PollCard';
import PollTimingDebugger from '@/app/components/PollTimingDebugger';
import { getPollPDA } from '@/app/utils/pdas';

// Simple heading component to ensure proper display
const WhiteHeading = ({ children }: { children: React.ReactNode }) => (
  <div style={{ 
    color: 'white', 
    fontSize: '24px', 
    fontWeight: 'bold',
    textShadow: '0 0 2px rgba(255,255,255,0.5)'
  }}>
    {children}
  </div>
);

export default function Home() {
  const { publicKey, connected } = useWallet();
  const { fetchPolls, loading, status, program } = useVotingProgram();

  const [polls, setPolls] = useState<PollAccount[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [isWideScreen, setIsWideScreen] = useState(false);
  const [selectedPollForDebug, setSelectedPollForDebug] = useState<PollAccount | null>(null);
  const [showDebugger, setShowDebugger] = useState(false);
  const [fetchAttempts, setFetchAttempts] = useState(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  
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

  // More robust poll loading with retry mechanism
  useEffect(() => {
    const loadPollsWithRetry = async () => {
      // Only attempt to load polls if we have all the prerequisites
      if (!connected || !publicKey || !program) {
        console.log("Prerequisites not met:", {
          connected,
          publicKey: publicKey?.toString(),
          programReady: !!program
        });
        return;
      }

      try {
        console.log(`Attempting to load polls (attempt ${fetchAttempts + 1})`);
        setLoadError(null);
        
        const fetchedPolls = await fetchPolls();
        console.log(`Fetched ${fetchedPolls.length} polls`);
        
        if (fetchedPolls.length === 0 && fetchAttempts < 5) {
          // If no polls were found but we haven't tried many times, schedule another attempt
          console.log("No polls found, scheduling retry...");
          const retryDelay = 2000 + (fetchAttempts * 1000); // Increase delay with each attempt
          
          setTimeout(() => {
            setFetchAttempts(prev => prev + 1);
          }, retryDelay);
        } else {
          // Either we found polls or we've tried enough times
          setPolls(fetchedPolls);
        }
      } catch (err) {
        console.error("Error loading polls:", err);
        setLoadError(`Failed to load polls: ${err}`);
        
        // Retry on error
        if (fetchAttempts < 5) {
          const retryDelay = 2000 + (fetchAttempts * 1000);
          setTimeout(() => {
            setFetchAttempts(prev => prev + 1);
          }, retryDelay);
        }
      }
    };

    loadPollsWithRetry();
  }, [connected, publicKey, program, fetchAttempts]); // Re-run when wallet connects or when fetchAttempts changes

  // Manual poll refresh function
  const refreshPolls = async () => {
    if (!connected || !publicKey || !program) {
      setLoadError("Cannot refresh polls - wallet not connected or program not initialized");
      return;
    }

    try {
      setLoadError(null);
      console.log("Manually refreshing polls...");
      const fetchedPolls = await fetchPolls();
      console.log(`Refreshed ${fetchedPolls.length} polls`);
      setPolls(fetchedPolls);
    } catch (err) {
      console.error("Error refreshing polls:", err);
      setLoadError(`Failed to refresh polls: ${err}`);
    }
  };

  // Function to open the debugger for a specific poll
  const openDebugger = (poll: PollAccount) => {
    setSelectedPollForDebug(poll);
    setShowDebugger(true);
  };

  // Function to close the debugger
  const closeDebugger = () => {
    setShowDebugger(false);
    setSelectedPollForDebug(null);
  };

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
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '2rem', 
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
              color: 'white'
            }}>
              <WhiteHeading>
                {polls.length > 0 ? 'Active Polls' : 'No Polls Found'}
              </WhiteHeading>
              <div className="flex space-x-4">
                {/* Refresh Button */}
                <button
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 500,
                    boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                    border: 'none',
                    transition: 'all 0.2s ease',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onClick={refreshPolls}
                  disabled={loading}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 0 1-9 9c-4.97 0-9-4.03-9-9s4.03-9 9-9v1c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8h1z"></path>
                    <path d="M12 2v8l4.05-4.05"></path>
                  </svg>
                  {loading ? 'Refreshing...' : 'Refresh Polls'}
                </button>
                <div style={{ height:'8px' }}></div>
                {/* Create Poll Button */}
                <button
                  style={{
                    background: 'linear-gradient(135deg, #9333ea, #3b82f6)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    fontWeight: 500,
                    boxShadow: '0 3px 6px rgba(0,0,0,0.15)',
                    border: 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 3px 6px rgba(0,0,0,0.15)';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14"></path>
                  </svg>
                  {showCreateForm ? 'Cancel' : 'Create New Poll'}
                </button>
              </div>
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

        {/* Load Error Message */}
        {loadError && (
          <div className="p-4 rounded-lg mb-6 bg-red-900/30 text-red-300">
            {loadError}
            <div className="mt-2">
              <button 
                onClick={refreshPolls}
                style={{
                  background: 'rgba(220, 38, 38, 0.2)',
                  color: '#fca5a5',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: 500,
                  border: '1px solid rgba(220, 38, 38, 0.4)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(220, 38, 38, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)';
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6"></path>
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                </svg>
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Status Messages */}
        {status && (
          <div className={`p-4 rounded-lg mb-6 ${status.isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`}>
            {status.message}
          </div>
        )}

        {/* Connection Status Debug Info */}
        <div className="mb-6 text-sm text-gray-400 bg-gray-800/50 p-3 rounded-lg">
          <div>Wallet Connected: {connected ? 'Yes' : 'No'}</div>
          <div>Program Initialized: {program ? 'Yes' : 'No'}</div>
          <div>Load Attempts: {fetchAttempts}</div>
          {publicKey && <div>Wallet Address: {publicKey.toString().slice(0, 10)}...{publicKey.toString().slice(-6)}</div>}
        </div>

        {/* Create Poll Form */}
        {showCreateForm && publicKey && (
          <div className="mb-8">
            <CreatePollForm onPollCreated={() => {
              setShowCreateForm(false);
              refreshPolls();
            }} />
          </div>
        )}

        {/* Poll Timing Debugger Modal */}
        {showDebugger && selectedPollForDebug && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto text-white">
              <div className="flex justify-between items-center border-b border-gray-600 px-6 py-4">
                <h3 className="text-lg font-semibold text-white">Debug Poll Timing</h3>
                <button 
                  onClick={closeDebugger}
                  className="text-gray-300 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                {/* Make sure all required props are defined */}
                {program && selectedPollForDebug.account.pollId && (
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <PollTimingDebugger 
                      program={program} 
                      pollId={selectedPollForDebug.account.pollId} 
                      getPollPDA={getPollPDA}
                    />
                  </div>
                )}
                {(!program || !selectedPollForDebug.account.pollId) && (
                  <div className="p-4 bg-red-900/30 text-red-300 rounded-md">
                    Unable to load debugger - missing required data.
                    {!program && <div>Program not initialized</div>}
                    {!selectedPollForDebug.account.pollId && <div>Poll ID not available</div>}
                  </div>
                )}
              </div>
            </div>
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
                <div key={poll.publicKey.toString()}>
                  <PollCard
                    poll={poll}
                    onRefresh={refreshPolls}
                  />
                  {/* Debug Button */}
                  <div className="mt-3 text-right">
                    <button
                      onClick={() => openDebugger(poll)}
                      style={{
                        background: 'linear-gradient(135deg, #4b5563, #374151)',
                        color: '#e5e7eb',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                        border: 'none',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #6b7280, #4b5563)';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #4b5563, #374151)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M12 6v6l4 2"></path>
                      </svg>
                      Debug Timing
                    </button>
                  </div>
                </div>
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