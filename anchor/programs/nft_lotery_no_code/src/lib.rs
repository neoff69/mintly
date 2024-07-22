pub mod constants;
pub mod error;
pub mod instructions;

use anchor_lang::prelude::*;
pub use constants::*;
pub use instructions::*;

declare_id!("BFeJzozj43cFUMcNBYkEj6VR68Wcpqy34big4LjrqXho");

#[program]
pub mod nft_lotery_no_code {
    use super::*;

    // Create NFT
    pub fn create_nft_v1(ctx: Context<CreateNftV1>, args: CreateNftV1Args) -> Result<()> {
        create_nft_v1::CreateNftV1::handler(ctx, args)
    }

    // Create Collection
    pub fn create_collection_v1(
        ctx: Context<CreateCollectionV1>,
        args: CreateCollectionV1Args,
    ) -> Result<()> {
        create_collection_v1::CreateCollectionV1::handler(ctx, args)
    }

    // Transfer NFT
    pub fn transfer_v1(ctx: Context<TransferV1>, args: TransferV1Args) -> Result<()> {
        transfer_v1::TransferV1::handler(ctx, args)
    }

    // init jackpot vault
    pub fn init_jackpot_vault(ctx: Context<InitializeJackpotVault>) -> Result<()> {
        initialize_jackpot_vault::InitializeJackpotVault::handler(ctx)
    }
}
