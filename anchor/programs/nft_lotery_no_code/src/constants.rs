use anchor_lang::prelude::*;

#[constant]
// jackpot vault seed
pub const JACKPOT_SEED: &str = "jackpot_vault";

// JACKPOT_FEES : 0.01 SOL
pub const JACKPOT_FEES: u32 = 10000000;

// JACKPOT_MAX_TICKETS (one winner ticket and all other losers)
pub const JACKPOT_MAX_TICKETS: u32 = 10;

// JACKPOT WINNING TICKET ID
// JACKPOT_WINNING_TICKET_ID must be < JACKPOT_MAX_TICKETS if you want winners :)
pub const JACKPOT_WINNING_TICKET_ID: u32 = 0;
