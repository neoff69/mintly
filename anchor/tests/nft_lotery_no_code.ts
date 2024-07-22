import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { DataState, MPL_CORE_PROGRAM_ID } from '@metaplex-foundation/mpl-core';
import { NftLoteryNoCode } from '../target/types/nft_lotery_no_code';
import { Connection, PublicKey } from '@solana/web3.js';
import { assert } from 'chai';

describe('nft_lotery_no_code', () => {

    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace
        .NftLoteryNoCode as Program<NftLoteryNoCode>;

    it('Jackpot Vault Is initialized!', async () => {
        // Add your test here.
        const tx = await program.methods.initJackpotVault().rpc();
        console.log('Your transaction signature', tx);
    });

    it('Can create a NFT', async () => {
        const asset = anchor.web3.Keypair.generate();
        // Add your test here.
        const tx = await program.methods
            .createNftV1({
                name: 'Hello Anchor!',
                uri: 'www.example.com',
                plugins: null,
            })
            .accounts({
                asset: asset.publicKey,
                collection: null,
                signer: anchor.getProvider().publicKey,
                owner: null,
                updateAuthority: null,
                logWrapper: null,
            })
            .signers([asset])
            .rpc();
        console.log('Your transaction signature', tx);
    });

    it('Can create a Collection', async () => {
        const collection = anchor.web3.Keypair.generate();
        // Add your test here.
        const tx = await program.methods
            .createCollectionV1({
                name: 'Hello Anchor!',
                uri: 'www.example.com',
                plugins: [],
            })
            .accounts({
                collection: collection.publicKey,
                signer: anchor.getProvider().publicKey,
                updateAuthority: null,
            })
            .signers([collection])
            .rpc();
        console.log('Your transaction signature', tx);
    });

    it('Can transfer an NFT', async () => {
        const asset = anchor.web3.Keypair.generate();
        // Add your test here.
        await program.methods
            .createNftV1({
                name: 'Hello Anchor!',
                uri: 'www.example.com',
                plugins: null,
            })
            .accounts({
                asset: asset.publicKey,
                collection: null,
                signer: anchor.getProvider().publicKey,
                owner: null,
                updateAuthority: null,
                logWrapper: null,
            })
            .signers([asset])
            .rpc();

        const tx = await program.methods
            .transferV1({})
            .accounts({
                asset: asset.publicKey,
                collection: null,
                payer: anchor.getProvider().publicKey,
                newOwner: anchor.web3.Keypair.generate().publicKey,
                systemProgram: null,
                logWrapper: null,
            })
            .rpc();
        console.log('Your transaction signature', tx);
    });


    //fails to create an Collection with invalid name
    it('Fails to create a Collection with invalid name', async () => {
        try {
            const collection = anchor.web3.Keypair.generate();
            const tx = await program.methods.createCollectionV1({
                name: '', // Invalid name
                uri: 'www.example.com',
                plugins: [],
            }).accounts({
                collection: collection.publicKey,
                signer: anchor.getProvider().publicKey,
                updateAuthority: null,
            }).signers([collection]).rpc();
            console.log('Transaction signature', tx);
        } catch (err) {
            console.log('Expected error:', err);
            assert.ok(err.message.includes('InvalidMetadata'));
        }
    });

    //fails to create an Collection with invalid uri
    it('Fails to create a Collection with invalid uri', async () => {
        try {
            const collection = anchor.web3.Keypair.generate();
            const tx = await program.methods.createCollectionV1({
                name: 'Hello Anchor!',
                uri: '', // Invalid URI
                plugins: [],
            }).accounts({
                collection: collection.publicKey,
                signer: anchor.getProvider().publicKey,
                updateAuthority: null,
            }).signers([collection]).rpc();
            console.log('Transaction signature', tx);
        } catch (err) {
            console.log('Expected error:', err);
            assert.ok(err.message.includes('InvalidMetadata'));
        }
    });

    //fails to create a NFT with invalid name
    it('Fails to create a NFT with invalid name', async () => {
        try {
            const asset = anchor.web3.Keypair.generate();
            const tx = await program.methods.createNftV1({
                name: '', // Invalid name
                uri: 'www.example.com',
                plugins: null,
            }).accounts({
                asset: asset.publicKey,
                collection: null,
                signer: anchor.getProvider().publicKey,
                owner: null,
                updateAuthority: null,
                logWrapper: null,
            }).signers([asset]).rpc();
            console.log('Transaction signature', tx);
        } catch (err) {
            console.log('Expected error:', err);
            assert.ok(err.message.includes('InvalidMetadata'));
        }
    });

    //fails to create a NFT with invalid uri
    it('Fails to create a NFT with invalid uri', async () => {
        try {
            const asset = anchor.web3.Keypair.generate();
            const tx = await program.methods.createNftV1({
                name: 'Hello Anchor!',
                uri: '', // Invalid URI
                plugins: null,
            }).accounts({
                asset: asset.publicKey,
                collection: null,
                signer: anchor.getProvider().publicKey,
                owner: null,
                updateAuthority: null,
                logWrapper: null,
            }).signers([asset]).rpc();
            console.log('Transaction signature', tx);
        } catch (err) {
            console.log('Expected error:', err);
            assert.ok(err.message.includes('InvalidMetadata'));
        }
    });


    it('Lists all accounts for the program', async () => {
        // Define the program ID
        const programId = program.programId;

        // Fetch all accounts owned by the program
        const accounts = await provider.connection.getProgramAccounts(programId);

        console.log(`Accounts for program ${programId.toBase58()}:`);

        accounts.forEach(account => {
            console.log(`Account: ${account.pubkey.toBase58()}`);
        });

        // Optional: Add assertions to verify the existence of specific accounts
        assert.isTrue(accounts.length > 0, 'No accounts found for the program');
    });

    /*
    it('Displays the content of the Jackpot PDA', async () => {
        // Define the program ID
        const programId = program.programId;

        // Define the seeds used to derive the PDA
        const seeds = [Buffer.from('jackpot_vault')]; // Adjust this based on your actual seeds

        // Find the PDA
        const [pda, bump] = await PublicKey.findProgramAddressSync(seeds, programId);
        console.log('Jackpot PDA:', pda.toBase58());
        console.log('Bump:', bump);

        // Fetch the account info
        const accountInfo = await provider.connection.getAccountInfo(pda);
        console.log('Account Info: ', accountInfo);
        if (accountInfo) {
            const decodedData = program.coder.accounts.decode('JackpotVault', accountInfo.data);
            console.log('Jackpot Vault Data:', decodedData);
        } else {
            console.log('No account data found for PDA');
        }
    });
    */

});
