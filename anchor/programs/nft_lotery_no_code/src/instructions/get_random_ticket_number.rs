use anchor_lang::prelude::*;
use anchor_lang::solana_program::clock::Clock;
use rand_chacha::rand_core::RngCore;
use rand_chacha::rand_core::SeedableRng;
use rand_chacha::ChaChaRng; // Add this line to import the deposit function
use std::convert::TryInto;
use std::result;

use crate::error::WrapperError;

pub(crate) fn get_random_ticket_number(
    remaining_tickets: u32,
) -> result::Result<u32, WrapperError> {
    let clock: std::result::Result<Clock, ProgramError> = Clock::get();
    let current_timestamp = match clock {
        Ok(clock) => clock.unix_timestamp,
        Err(_) => {
            // Handle the error case
            return Err(WrapperError::ClockRetrievalFailed);
        }
    };
    msg!("current_timestamp {:?}", current_timestamp);

    let timestamp_bytes = current_timestamp.to_le_bytes();
    let array_32: [u8; 32] = timestamp_bytes.repeat(4).try_into().unwrap();
    let mut rng = ChaChaRng::from_seed(array_32);

    //get a randmom number
    let rand_integer: u32 = rng.next_u32();
    msg!("rand_integer {:?}", rand_integer);

    //get a number from 0 to JACKPOT_MAX_TICKETS-1
    let random = rand_integer % remaining_tickets;
    msg!("random {:?}", random);

    Ok(random.into())
}
