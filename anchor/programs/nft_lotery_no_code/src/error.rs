use anchor_lang::prelude::*;

#[error_code]
pub enum WrapperError {
    #[msg("Invalid plugin type")]
    InvalidPluginType,
    #[msg("Insufficient funds")]
    InsufficientFunds,
    #[msg("Clock retrieval failed")]
    ClockRetrievalFailed,
    #[msg("Overflow")]
    Overflow,
    #[msg("Underflow")]
    Underflow,
}
