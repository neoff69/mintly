    use std::mem::size_of;
use std::result;

pub use crate::constants::*;
use crate::error::WrapperError;
pub use crate::instructions::*;
use anchor_lang::prelude::*;

    //event for jackpot balance change
    #[event]
    pub struct JackpotBalance {
        pub remaining_tickets: u32,
        pub balance: u32,
    }

    //event for jackpot win event, with the winner address  
    #[event]
    pub struct JackpotWin {
        pub winner: Pubkey,
    }

    // Jackpot Vault Structure
    #[account]
    pub struct JackpotVault {    
        pub deposited_fee_number: u32,
        pub remaining_tickets: u32,
    }
        // Reinitialize Jackpot Vault
        impl JackpotVault {
                pub fn reinitialize_jackpot_vault(vault: &mut JackpotVault) -> Result<()> {
                        vault.deposited_fee_number = 0;
                        vault.remaining_tickets = JACKPOT_MAX_TICKETS;
                        Ok(())
                }        
        }
        // Increment Jackpot Vault Counter
        impl JackpotVault {
                pub fn increment_jackpot_vault_counter(vault: &mut JackpotVault) -> result::Result<(), WrapperError> {
                        vault.deposited_fee_number = vault.deposited_fee_number.checked_add(1).ok_or(WrapperError::Overflow)?;
                        vault.remaining_tickets = vault.remaining_tickets.checked_sub(1).ok_or(WrapperError::Underflow)?;
                        Ok(())
                }                
        }
    // Jackpot Vault initialization structure
    #[derive(Accounts)]
    pub struct InitializeJackpotVault<'info> {
        #[account(
            init, 
            payer = signer, 
            space = size_of::<JackpotVault>() + 8 , 
            seeds = [JACKPOT_SEED.as_bytes()], 
            bump)]
        pub jackpot_vault: Account<'info, JackpotVault>,
        #[account(mut)]
        pub signer: Signer<'info>,
        pub system_program: Program<'info, System>,
    }

    // Initialize Jackpot Vault
    impl<'info> InitializeJackpotVault<'info> {
        pub fn handler(_ctx: Context<InitializeJackpotVault>) -> Result<()> {
            // Reinitialize Jackpot Vault
            JackpotVault::reinitialize_jackpot_vault(&mut _ctx.accounts.jackpot_vault)?;    
            msg!("Jackpot Vault created");
            msg!("Jackpot Vault address: {:?}", _ctx.accounts.jackpot_vault.key());
            Ok(())
        }
    }
 
