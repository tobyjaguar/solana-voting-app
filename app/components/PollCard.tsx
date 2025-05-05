'use client';

import { useState, useEffect } from 'react';
import { PollAccount, CandidateAccount } from '@/app/models/types';
import AddCandidateForm from './AddCandidateForm';
import CandidateList from './CandidateList';
import useVotingProgram from '@/app/hooks/useVotingProgram';

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
    <div className={`bg-slate-800 p-4 rounded-lg ${isActive ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500 opacity-80'}`}>
      <h3 className="text-xl font-bold mb-2">{poll.account.description}</h3>
      
      <div className="text-sm text-slate-400 mb-4">
        <p>Status: {isActive ? 'Active' : 'Inactive'}</p>
        <p>
          Period: {formatDate(poll.account.pollStartTime)} to {formatDate(poll.account.pollEndTime)}
        </p>
      </div>
      
      {isActive && (
        <div className="mb-4">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-lg text-sm"
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