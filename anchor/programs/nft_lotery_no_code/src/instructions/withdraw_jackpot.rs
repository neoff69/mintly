pub use crate::constants::*;
pub use crate::instructions::*;
use anchor_lang::prelude::*;
use anchor_lang::solana_program::native_token::LAMPORTS_PER_SOL;

#[derive(Accounts)]
pub struct WithdrawJackpot<'info> {
    #[account(mut, seeds = [JACKPOT_SEED.as_bytes()], bump)]
    pub jackpot_vault: Account<'info, JackpotVault>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

impl<'info> WithdrawJackpot<'info> {
    pub fn handler(ctx: Context<WithdrawJackpot>, amount: u64) -> Result<()> {
        **ctx
            .accounts
            .jackpot_vault
            .to_account_info()
            .try_borrow_mut_lamports()? -= amount * LAMPORTS_PER_SOL;
        **ctx
            .accounts
            .signer
            .to_account_info()
            .try_borrow_mut_lamports()? += amount * LAMPORTS_PER_SOL;

        msg!("Withdrew {} SOL from the vault", amount);
        Ok(())
    }
}
