'use client';

import { useState, useEffect } from 'react';
import { PollAccount, CandidateAccount } from '@/app/models/types';
import AddCandidateForm from './AddCandidateForm';
import CandidateList from './CandidateList';
import useVotingProgram from '@/app/hooks/useVotingProgram';
import { BN } from '@project-serum/anchor';

interface PollCardProps {
  poll: PollAccount;
  onRefresh: () => void;
}

const PollCard = ({ poll, onRefresh }: PollCardProps) => {
  const [candidates, setCandidates] = useState<CandidateAccount[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { fetchCandidates } = useVotingProgram();
  
  // Check if poll is active
  const now = Math.floor(Date.now() / 1000);
  const isActive = poll.account.pollStartTime.lte(new BN(now)) && 
                   poll.account.pollEndTime.gte(new BN(now));
                   
  // Add debug logging for poll timing
  useEffect(() => {
    console.log(`Poll: ${poll.account.description}`);
    console.log(`Current time: ${now}`);
    console.log(`Start time: ${poll.account.pollStartTime.toString()}`);
    console.log(`End time: ${poll.account.pollEndTime.toString()}`);
    console.log(`Is active: ${isActive}`);
  }, [poll]);
  
  // Load candidates for this poll
  const loadCandidates = async () => {
    setLoading(true);
    const pollCandidates = await fetchCandidates(poll.account.pollId);
    setCandidates(pollCandidates);
    setLoading(false);
  };
  
  useEffect(() => {
    loadCandidates();
  }, [poll]);
  
  const formatDate = (timestamp: BN) => {
    return new Date(timestamp.toNumber() * 1000).toLocaleString();
  };
  
  return (
    <div style={{
      backgroundColor: '#1e293b',
      padding: '24px', 
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      borderLeft: `4px solid ${isActive ? '#22c55e' : '#ef4444'}`,
      opacity: isActive ? 1 : 0.8
    }}>
      <h3 style={{fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '12px'}}>{poll.account.description}</h3>
      
      <div style={{fontSize: '0.875rem', color: '#94a3b8', marginBottom: '20px'}}>
        <p style={{marginBottom: '4px'}}>Status: <span style={{color: isActive ? '#4ade80' : '#f87171'}}>
          {isActive ? 'Active' : 'Inactive'}
        </span></p>
        <p>
          Period: {formatDate(poll.account.pollStartTime)} to {formatDate(poll.account.pollEndTime)}
        </p>
      </div>
      
      {isActive && (
        <div style={{marginBottom: '16px'}}>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.875rem',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            {showAddForm ? 'Cancel' : 'Add Project Option'}
          </button>
          
          {showAddForm && (
            <AddCandidateForm 
              pollId={poll.account.pollId} 
              onCandidateAdded={() => {
                setShowAddForm(false);
                loadCandidates();
              }} 
            />
          )}
        </div>
      )}
      
      <div>
        <h4 className="text-lg font-semibold mb-3">Project Options:</h4>
        
        {loading ? (
          <p className="text-center py-4 text-slate-400">Loading candidates...</p>
        ) : (
          <CandidateList
            pollId={poll.account.pollId}
            candidates={candidates}
            isActive={isActive}
            onVoted={() => {
              loadCandidates();
              onRefresh();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default PollCard;