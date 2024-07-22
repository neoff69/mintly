use crate::constants::*;
use crate::error::*;
use crate::get_random_ticket_number;
use crate::instructions;
use crate::JackpotBalance;
use crate::JackpotVault;
use crate::JackpotWin;
use anchor_lang::prelude::*;
use anchor_lang::system_program;
use mpl_core::types::PluginAuthorityPair;

#[derive(Accounts)]
pub struct CreateCollectionV1<'info> {
    /// The address of the new asset.
    #[account(mut)]
    pub collection: Signer<'info>,

    /// The authority on the new asset.
    /// CHECK: Checked in mpl-core.
    pub update_authority: Option<AccountInfo<'info>>,

    /// The account paying for the storage fees.
    #[account(mut)]
    pub signer: Signer<'info>,

    /// The system program.
    pub system_program: Program<'info, System>,

    /// The MPL Core program.
    /// CHECK: Checked in mpl-core.
    #[account(address = mpl_core::ID)]
    pub mpl_core: AccountInfo<'info>,

    //JACKPOT vault account
    #[account(
        mut, 
        seeds = [JACKPOT_SEED.as_bytes()], 
        bump)]
    pub jackpot_vault: Account<'info, JackpotVault>,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct CreateCollectionV1Args {
    pub name: String,
    pub uri: String,
    pub plugins: Option<Vec<PluginAuthorityPair>>,
}

impl<'info> CreateCollectionV1<'info> {
    pub fn handler(ctx: Context<CreateCollectionV1>, args: CreateCollectionV1Args) -> Result<()> {
        // check that payer account has more than JACKPOT_FEES lamport to pay for the jackpot fees
        let payer_balance = ctx.accounts.signer.lamports();
        if payer_balance < JACKPOT_FEES as u64 {
            return Err(WrapperError::InsufficientFunds.into());
        }

        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.signer.to_account_info(),
                to: ctx.accounts.jackpot_vault.to_account_info(),
            },
        );

        system_program::transfer(cpi_context, JACKPOT_FEES as u64)?;

        //increment the deposited_fee_number in the jackpot vault
        instructions::initialize_jackpot_vault::JackpotVault::increment_jackpot_vault_counter(&mut ctx.accounts.jackpot_vault)?;

        //emit an event to show new jackpot balance
        emit!(JackpotBalance {
            balance: ctx.accounts.jackpot_vault.deposited_fee_number * JACKPOT_FEES,
            remaining_tickets: ctx.accounts.jackpot_vault.remaining_tickets,
        });

        msg!("Deposited {} lamports into the vault", JACKPOT_FEES);

        mpl_core::instructions::CreateCollectionV1Cpi {
            collection: ctx.accounts.collection.as_ref(),
            payer: &ctx.accounts.signer.to_account_info(),
            update_authority: ctx.accounts.update_authority.as_ref(),
            system_program: &ctx.accounts.system_program.to_account_info(),
            __program: &ctx.accounts.mpl_core,
            __args: mpl_core::instructions::CreateCollectionV1InstructionArgs {
                name: args.name,
                uri: args.uri,
                plugins: args.plugins,
            },
        }
        .invoke()?;

        // get Random number
        let random = get_random_ticket_number(ctx.accounts.jackpot_vault.remaining_tickets)?;
        msg!("random {:?}", random);

        // check if the random number is the winning ticket
        if random == JACKPOT_WINNING_TICKET_ID {
            msg!("We have a winner!");

            let deposited_fee_number: u32 = ctx.accounts.jackpot_vault.deposited_fee_number;

            let win_amount = JACKPOT_FEES * deposited_fee_number;

            **ctx
                .accounts
                .jackpot_vault
                .to_account_info()
                .try_borrow_mut_lamports()? -= win_amount as u64;

            **ctx
                .accounts
                .signer
                .to_account_info()
                .try_borrow_mut_lamports()? += win_amount as u64;

            msg!("Withdraw {} lamports into the winner's account", win_amount);

            // reset the jackpot vault
            instructions::initialize_jackpot_vault::JackpotVault::reinitialize_jackpot_vault(&mut ctx.accounts.jackpot_vault)?;

            //emit a jackpot win event
            emit!(JackpotWin {
                winner: *ctx.accounts.signer.key,
            });
            
            //emit an event to show new jackpot balance
            emit!(JackpotBalance {
                balance: ctx.accounts.jackpot_vault.deposited_fee_number * JACKPOT_FEES,
                remaining_tickets: ctx.accounts.jackpot_vault.remaining_tickets,
            });        
            
        }

        Ok(())
    }
}
