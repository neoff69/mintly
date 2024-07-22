'use client';

import { AppHero } from '../ui/ui-layout';
import * as anchor from '@coral-xyz/anchor';
import { BorshCoder, EventParser, Program } from '@coral-xyz/anchor';
import { NftLoteryNoCode } from '../idl/nft_lotery_no_code';
import { useAnchorProvider } from '../solana/solana-provider';
import { IDL } from '../idl/idl';
import web3, { PublicKey } from '@solana/web3.js';
import { get } from 'http';
import { set } from '@coral-xyz/anchor/dist/cjs/utils/features';
import { Dispatch, SetStateAction, useState } from 'react';

async function getBalance(
    program: Program<NftLoteryNoCode>,
    setBalance: Dispatch<SetStateAction<number>>,
    setRemainingTicket: Dispatch<SetStateAction<number>>
) {
    const [address] = PublicKey.findProgramAddressSync(
        [Buffer.from('jackpot_vault')],
        program.programId
    );
    const data = await program.account.jackpotVault.fetch(address);
    console.log('data:', data);
    setBalance(data.depositedFeeNumber * 10000000);
    setRemainingTicket(data.remainingTickets);
    return data;
}

export default function DashboardFeature() {
    const provider = useAnchorProvider();
    const program = new Program<NftLoteryNoCode>(
        JSON.parse(JSON.stringify(IDL)),
        provider
    );
    const [balance, setBalance] = useState<number>(-1);
    const [remainingTickets, setRemainingTickets] = useState<number>(-1);
    const [winner, setWinner] = useState<null | string>(null);
    if (balance === -1 || remainingTickets == -1)
        getBalance(program, setBalance, setRemainingTickets);

    program.addEventListener('jackpotBalance', (event, slot) => {
        console.log('jackpotBalance event:', event);
        setBalance(event.balance);
        setRemainingTickets(event.remainingTickets);
    });

    program.addEventListener('jackpotWin', (event, slot) => {
        console.log('jackpotBalance event:', event);
        setWinner(event.winner.toString());
    });

    return (
        <div>
            <AppHero
                title="Welcome to Mintly our project for alyra."
                subtitle="Mintly is a no-code platform that allows users 
                to create, mint, and publish NFTs on the Solana blockchain 
                effortlessly. With an intuitive drag-and-drop interface and 
                pre-designed templates, users can easily manage NFT metadata 
                and connect to Solana for secure, low-cost transactions. 
                This tool democratizes NFT creation, making blockchain 
                technology accessible to everyone."
                balance={balance}
                remainingTickets={remainingTickets}
            />
            {winner ? (
                <div role="alert" className="alert alert-success">
                    <svg
                        className="h-6 w-6 shrink-0 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>The user {winner} won the lottery</span>
                </div>
            ) : null}
        </div>
    );
}
