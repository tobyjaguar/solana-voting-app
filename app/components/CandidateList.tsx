'use client';

import { useState } from 'react';
import { BN } from '@project-serum/anchor';
import { CandidateAccount } from '@/app/models/types';
import useVotingProgram from '@/app/hooks/useVotingProgram';

interface CandidateListProps {
  pollId: BN;
  candidates: CandidateAccount[];
  isActive: boolean;
  onVoted: () => void;
}

const CandidateList = ({ pollId, candidates, isActive, onVoted }: CandidateListProps) => {
  const { vote, loading, status } = useVotingProgram();
  const [votingFor, setVotingFor] = useState<string | null>(null);
  
  const handleVote = async (candidateName: string) => {
    setVotingFor(candidateName);
    const success = await vote(pollId, candidateName);
    if (success) {
      setTimeout(() => {
        onVoted();
        setVotingFor(null);
      }, 2000);
    } else {
      setVotingFor(null);
    }
  };
  
  if (candidates.length === 0) {
    return <p className="text-slate-400 text-center py-4">No project options added yet.</p>;
  }
  
  return (
    <div>
      <ul className="space-y-2">
        {candidates.map((candidate) => (
          <li 
            key={candidate.account.candidateName} 
            className="bg-slate-700 p-3 rounded-lg flex justify-between items-center"
          >
            <div>
              <h5 className="font-medium">{candidate.account.candidateName}</h5>
              <p className="text-sm text-slate-300">Votes: {candidate.account.candidateVotes.toString()}</p>
            </div>
            
            {isActive && (
              <button
                onClick={() => handleVote(candidate.account.candidateName)}
                disabled={loading || votingFor !== null}
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
                {votingFor === candidate.account.candidateName ? 'Voting...' : 'Vote'}
              </button>
            )}
          </li>
        ))}
      </ul>
      
      {status && votingFor && (
        <div className={`mt-3 p-2 rounded text-sm ${status.isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default CandidateList;