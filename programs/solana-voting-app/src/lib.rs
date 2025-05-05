use anchor_lang::prelude::*;

declare_id!("C82ywxcsy6SahTq2CvdnGsN4xN1aKeWan7VR3mDQgi8V");

#[program]
pub mod solana_voting_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
