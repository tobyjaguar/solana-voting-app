'use client';

import { useState } from 'react';
import useVotingProgram from '@/app/hooks/useVotingProgram';
import { MAX_DESCRIPTION_LENGTH } from '@/app/utils/constants';

interface CreatePollFormProps {
  onPollCreated: () => void;
}

const CreatePollForm = ({ onPollCreated }: CreatePollFormProps) => {
  const [description, setDescription] = useState('');
  const { createPoll, loading, status } = useVotingProgram();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      return;
    }
    
    const success = await createPoll(description);
    
    if (success) {
      setDescription('');
      setTimeout(() => {
        onPollCreated();
      }, 2000);
    }
  };
  
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg mb-8">
      <h3 className="text-xl font-bold mb-5">Create New Poll</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="description" className="block mb-2 text-slate-300">
            Poll Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 bg-slate-700 rounded-lg border border-slate-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
            placeholder="e.g., Which Solana project should we build next?"
            maxLength={MAX_DESCRIPTION_LENGTH}
            rows={3}
            required
          />
          <div className="text-xs text-slate-400 mt-2">
            {description.length}/{MAX_DESCRIPTION_LENGTH}
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !description.trim()}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-6 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? 'Creating...' : 'Create Poll'}
        </button>
      </form>
      
      {status && (
        <div className={`mt-5 p-4 rounded-lg ${status.isError ? 'bg-red-900/30 text-red-300' : 'bg-green-900/30 text-green-300'}`}>
          {status.message}
        </div>
      )}
    </div>
  );
};

export default CreatePollForm;