'use client';

import { useState } from 'react';
import { BN } from '@project-serum/anchor';
import useVotingProgram from '@/app/hooks/useVotingProgram';
import { MAX_CANDIDATE_NAME_LENGTH } from '@/app/utils/constants';

interface AddCandidateFormProps {
  pollId: BN;
  onCandidateAdded: () => void;
}

const AddCandidateForm = ({ pollId, onCandidateAdded }: AddCandidateFormProps) => {
  const [candidateName, setCandidateName] = useState('');
  const { addCandidate, loading, status } = useVotingProgram();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!candidateName.trim()) {
      return;
    }
    
    const success = await addCandidate(pollId, candidateName);
    
    if (success) {
      setCandidateName('');
      setTimeout(() => {
        onCandidateAdded();
      }, 2000);
    }
  };
  
  return (
    <div className="bg-slate-900 p-4 rounded-lg mb-4">
      <h4 className="text-lg font-bold mb-3">Add Project Option</h4>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="candidateName" className="block mb-1 text-sm">
            Project Name
          </label>
          <input
            id="candidateName"
            type="text"
            value={candidateName}
            onChange={(e) => {
              const target = e.target as HTMLInputElement;
              setCandidateName(target.value);
            }}
            className="w-full p-2 bg-slate-700 rounded border border-slate-600"
            placeholder="e.g., Solana DAO, Beer Token"
            maxLength={MAX_CANDIDATE_NAME_LENGTH}
            required
          />
          <div className="text-xs text-slate-400 mt-1">
            {candidateName.length}/{MAX_CANDIDATE_NAME_LENGTH}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !candidateName.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded text-sm disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </form>
      
      {status && (
        <div className={`mt-3 p-2 rounded text-sm ${status.isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default AddCandidateForm;