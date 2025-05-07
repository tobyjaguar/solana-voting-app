'use client';

import { useState } from 'react';
import { BN } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Program } from '@coral-xyz/anchor';

// Adding proper TypeScript types
interface PollTimingDebuggerProps {
  program: Program | null;
  pollId: BN | null;
  getPollPDA: (pollId: BN) => any;
}

interface TimingInfo {
  pollId: string;
  description: string;
  pollStartTimeUnix: string;
  pollStartTimeDate: string;
  pollEndTimeUnix: string;
  pollEndTimeDate: string;
  blockchainTimeUnix: string;
  blockchainTimeDate: string;
  clientTimeUnix: string;
  clientTimeDate: string;
  secondsUntilStart: number;
  secondsUntilEnd: number;
  status: string;
  timeDifference: number | string;
}

const PollTimingDebugger = ({ program, pollId, getPollPDA }: PollTimingDebuggerProps) => {
  const { connection } = useConnection();
  const [timingInfo, setTimingInfo] = useState<TimingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkPollTiming = async () => {
    if (!program) {
      setError("Program not initialized");
      return;
    }

    if (!pollId) {
      setError("No poll ID provided");
      return;
    }

    setLoading(true);
    setError(null);
    setTimingInfo(null);

    try {
      // Convert pollId to BN if it's not already
      const pollIdBN = pollId instanceof BN ? pollId : new BN(pollId);
      
      // Get the PDA for the poll
      const pollPDA = getPollPDA(pollIdBN);
      console.log("Checking timing for poll:", pollPDA.toString());
      
      // Fetch the poll account
      const pollAccount = await program.account.poll.fetch(pollPDA);
      
      // Safely extract values with null checks
      const startTime = pollAccount.poll_start_time || pollAccount.pollStartTime;
      const endTime = pollAccount.poll_end_time || pollAccount.pollEndTime;
      
      if (!startTime || !endTime) {
        throw new Error("Poll start or end time not found in account data");
      }
      
      // Get client time
      const clientNow = Math.floor(Date.now() / 1000);
      
      // Get blockchain time (approximate)
      const slot = await connection.getSlot();
      const blockTime = await connection.getBlockTime(slot);
      
      // Calculate time differences - use null check to avoid errors
      const secondsUntilStart = blockTime ? Number(startTime) - blockTime : Number(startTime) - clientNow;
      const secondsUntilEnd = blockTime ? Number(endTime) - blockTime : Number(endTime) - clientNow;
      
      // Determine poll status
      let status = "UNKNOWN";
      if (secondsUntilStart > 0) {
        status = "NOT STARTED";
      } else if (secondsUntilEnd < 0) {
        status = "ENDED";
      } else {
        status = "ACTIVE";
      }
      
      // Format timestamps for display
      const info: TimingInfo = {
        pollId: pollIdBN.toString(),
        description: pollAccount.description || "",
        pollStartTimeUnix: startTime.toString(),
        pollStartTimeDate: new Date(Number(startTime) * 1000).toLocaleString(),
        pollEndTimeUnix: endTime.toString(),
        pollEndTimeDate: new Date(Number(endTime) * 1000).toLocaleString(),
        blockchainTimeUnix: blockTime ? blockTime.toString() : "Unknown",
        blockchainTimeDate: blockTime ? new Date(blockTime * 1000).toLocaleString() : "Unknown",
        clientTimeUnix: clientNow.toString(),
        clientTimeDate: new Date(clientNow * 1000).toLocaleString(),
        secondsUntilStart: secondsUntilStart,
        secondsUntilEnd: secondsUntilEnd,
        status: status,
        timeDifference: blockTime ? (clientNow - blockTime) : "Unknown"
      };
      
      // Save timing info to state
      setTimingInfo(info);
      
      // Also log to console for easier debugging
      console.log("Poll timing details:", info);
      
    } catch (err) {
      console.error("Error checking poll timing:", err);
      setError(`Failed to check poll timing: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="poll-timing-debugger">
      <h3>Poll Timing Debugger</h3>
      
      <button 
        onClick={checkPollTiming}
        disabled={loading || !program || !pollId}
        className="debug-button"
      >
        {loading ? "Checking..." : "Check Poll Timing"}
      </button>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {timingInfo && (
        <div className="timing-results">
          <h4>Poll Information</h4>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">Poll ID:</span>
              <span className="info-value">{timingInfo.pollId}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Description:</span>
              <span className="info-value">{timingInfo.description}</span>
            </div>
            
            <h4>Timing Information</h4>
            <div className="info-row">
              <span className="info-label">Poll Start Time:</span>
              <span className="info-value">
                {timingInfo.pollStartTimeUnix} ({timingInfo.pollStartTimeDate})
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Poll End Time:</span>
              <span className="info-value">
                {timingInfo.pollEndTimeUnix} ({timingInfo.pollEndTimeDate})
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Current Blockchain Time:</span>
              <span className="info-value">
                {timingInfo.blockchainTimeUnix} ({timingInfo.blockchainTimeDate})
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Current Client Time:</span>
              <span className="info-value">
                {timingInfo.clientTimeUnix} ({timingInfo.clientTimeDate})
              </span>
            </div>
            
            <h4>Analysis</h4>
            <div className="info-row">
              <span className="info-label">Current Status:</span>
              <span className={`info-value status-${timingInfo.status.toLowerCase().replace(' ', '-')}`}>
                {timingInfo.status}
              </span>
            </div>
            {timingInfo.secondsUntilStart > 0 ? (
              <div className="info-row">
                <span className="info-label">Time Until Poll Starts:</span>
                <span className="info-value">
                  {timingInfo.secondsUntilStart} seconds ({Math.floor(timingInfo.secondsUntilStart / 60)} minutes)
                </span>
              </div>
            ) : timingInfo.secondsUntilEnd < 0 ? (
              <div className="info-row">
                <span className="info-label">Time Since Poll Ended:</span>
                <span className="info-value">
                  {Math.abs(timingInfo.secondsUntilEnd)} seconds ({Math.floor(Math.abs(timingInfo.secondsUntilEnd) / 60)} minutes)
                </span>
              </div>
            ) : (
              <div className="info-row">
                <span className="info-label">Time Until Poll Ends:</span>
                <span className="info-value">
                  {timingInfo.secondsUntilEnd} seconds ({Math.floor(timingInfo.secondsUntilEnd / 60)} minutes)
                </span>
              </div>
            )}
            <div className="info-row">
              <span className="info-label">Client-Blockchain Time Difference:</span>
              <span className={`info-value ${typeof timingInfo.timeDifference === 'number' && Math.abs(timingInfo.timeDifference) > 120 ? 'warning' : ''}`}>
                {timingInfo.timeDifference} seconds
                {typeof timingInfo.timeDifference === 'number' && Math.abs(timingInfo.timeDifference) > 120 && " (WARNING: Large time difference!)"}
              </span>
            </div>
          </div>
          
          {timingInfo.status === "NOT STARTED" && (
            <div className="conclusion">
              <p className="warning">
                The poll has not started yet according to blockchain time. This explains why you cannot add candidates.
              </p>
              <p>
                Options to resolve this:
              </p>
              <ol>
                <li>Wait until the poll starts naturally</li>
                <li>Create a new poll with an earlier start time (10+ minutes in the past)</li>
                <li>Implement a function to update the poll timing</li>
              </ol>
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        .poll-timing-debugger {
          margin: 20px 0;
          padding: 15px;
          border: 1px solid #4b5563;
          border-radius: 8px;
          background-color: #1e293b;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          color: #e5e7eb;
        }
        
        h3, h4 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #f3f4f6;
        }
        
        h4 {
          margin-top: 20px;
          border-bottom: 1px solid #4b5563;
          padding-bottom: 5px;
        }
        
        .debug-button {
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 14px;
          transition: background-color 0.2s;
        }
        
        .debug-button:hover {
          background-color: #2563eb;
        }
        
        .debug-button:disabled {
          background-color: #64748b;
          cursor: not-allowed;
        }
        
        .error-message {
          margin-top: 10px;
          padding: 10px;
          background-color: rgba(220, 38, 38, 0.3);
          color: #fca5a5;
          border-radius: 4px;
        }
        
        .timing-results {
          margin-top: 20px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        
        .info-row {
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 10px;
          align-items: center;
        }
        
        .info-label {
          font-weight: 600;
          color: #d1d5db;
        }
        
        .info-value {
          font-family: monospace;
          background-color: #374151;
          padding: 4px 8px;
          border-radius: 3px;
          overflow-wrap: break-word;
          color: #f3f4f6;
        }
        
        .warning {
          color: #fca5a5;
          font-weight: bold;
        }
        
        .status-active {
          background-color: rgba(16, 185, 129, 0.3);
          color: #6ee7b7;
        }
        
        .status-not-started {
          background-color: rgba(239, 68, 68, 0.3);
          color: #fca5a5;
        }
        
        .status-ended {
          background-color: rgba(107, 114, 128, 0.3);
          color: #d1d5db;
        }
        
        .conclusion {
          margin-top: 20px;
          padding: 15px;
          background-color: rgba(59, 130, 246, 0.2);
          border-radius: 4px;
          border-left: 4px solid #3b82f6;
          color: #bfdbfe;
        }
      `}</style>
    </div>
  );
};

export default PollTimingDebugger;