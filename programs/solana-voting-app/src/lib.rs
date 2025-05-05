use anchor_lang::prelude::*;

declare_id!("C82ywxcsy6SahTq2CvdnGsN4xN1aKeWan7VR3mDQgi8V");

#[program]
pub mod solana_voting_app {
    use super::*;

    pub fn initialize_poll(ctx: Context<InitializePoll>, 
                            poll_id: u64, 
                            description: String,
                            poll_start_time: u64, 
                            poll_end_time: u64) -> Result<()> {
        let poll = &mut ctx.accounts.poll;
        poll.poll_id = poll_id;
        poll.description = description;
        poll.poll_start_time = poll_start_time;
        poll.poll_end_time = poll_end_time;
        poll.candidate_amount = 0;
        Ok(())
    }

    pub fn initialize_candidate(ctx: Context<InitializeCandidate>, 
                            _poll_id: u64, 
                            candidate_name: String) -> Result<()> {
        let candidate = &mut ctx.accounts.candidate;
        let poll = &mut ctx.accounts.poll;
        if poll.poll_start_time > Clock::get()?.unix_timestamp as u64 {
            return Err(VotingError::PollNotStarted.into());
        }
        if poll.poll_end_time < Clock::get()?.unix_timestamp as u64 {
            return Err(VotingError::PollEnded.into());
        }
        poll.candidate_amount += 1;
        candidate.candidate_name = candidate_name;
        candidate.candidate_votes = 0;
        Ok(())
    }

    pub fn vote(ctx: Context<Vote>, 
                _poll_id: u64, 
                _candidate_name: String) -> Result<()> {
        let poll = &mut ctx.accounts.poll;
        let candidate = &mut ctx.accounts.candidate;

        if poll.poll_start_time > Clock::get()?.unix_timestamp as u64 {
            return Err(VotingError::PollNotStarted.into());
        }
        if poll.poll_end_time < Clock::get()?.unix_timestamp as u64 {
            return Err(VotingError::PollEnded.into());
        }

        candidate.candidate_votes += 1;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(poll_id: u64)]
pub struct InitializePoll<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        init,
        payer = signer,
        space = 8 + Poll::INIT_SPACE,
        seeds = [poll_id.to_le_bytes().as_ref()],
        bump,

    )]
    pub poll: Account<'info, Poll>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Poll {
    pub poll_id: u64,
    #[max_len(280)]
    pub description: String,
    pub poll_start_time: u64,
    pub poll_end_time: u64,
    pub candidate_amount: u64
}

#[derive(Accounts)]
#[instruction(poll_id: u64, candidate_name: String)]
pub struct InitializeCandidate<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        seeds = [poll_id.to_le_bytes().as_ref()],
        bump,
    )]
    pub poll: Account<'info, Poll>,

    #[account(
        init,
        payer = signer,
        space = 8 + Candidate::INIT_SPACE,
        seeds = [poll_id.to_le_bytes().as_ref(), candidate_name.as_bytes()],
        bump,
    )]
    pub candidate: Account<'info, Candidate>,

    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Candidate {
    #[max_len(32)]
    pub candidate_name: String,
    pub candidate_votes: u64,
}

#[derive(Accounts)]
#[instruction(poll_id: u64, candidate_name: String)]
pub struct Vote<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,

    #[account(
        seeds = [poll_id.to_le_bytes().as_ref()],
        bump,
    )]
    pub poll: Account<'info, Poll>,

    #[account(
        mut,
        seeds = [poll_id.to_le_bytes().as_ref(), candidate_name.as_bytes()],
        bump,
    )]
    pub candidate: Account<'info, Candidate>,

    #[account(
        init_if_needed,
        payer = signer,
        space = 8,
        seeds = [poll_id.to_le_bytes().as_ref(), candidate_name.as_bytes(), signer.key().as_ref()],
        bump,
    )]
    pub voter_record: Account<'info, VoterRecord>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct VoterRecord {}

#[error_code]
pub enum VotingError {
    #[msg("Poll has not started yet")]
    PollNotStarted,
    
    #[msg("Poll has already ended")]
    PollEnded,
}