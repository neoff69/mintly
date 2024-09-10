# PROJECT FOR ALYRA.

# What is MINTLY ?

Mintly is a no-code platform that allows users to create, mint, and publish NFTs on the Solana blockchain effortlessly. With an intuitive drag-and-drop interface and pre-designed templates, users can easily manage NFT metadata and connect to Solana for secure, low-cost transactions. This tool democratizes NFT creation, making blockchain technology accessible to everyone.

On every nft published the user participate and have a chance to win a lottery.

Mintly curently permit user to create NFTs and collections, an image generation by dall-e is also possible directly from the site.

# How it works ?

Once the user complete the form to create an NFT (file, name, description).
Then the file is stored on an ipfs link with the pinata api, an other call to the api if made to make the final ipfs link with all the metadata from the form.
A call to the Solana smartcontract is made and the NFT is stored on the blockchain.

### Contributeurs :

<p align="flex">
  <img src="https://github.com/mike-fr13.png" alt="Yannick" width="100" height="100" />
  <img src="https://github.com/neoff69.png" alt="Valentin" width="100" height="100" />
</p>


# Getting Started

Follow these steps to clone the repository and start the development server:

-   `git clone https://github.com/mike-fr13/mintly-v2`
-   `npm install`
-   `npm run dev`

You should now be able to access the application at http://localhost:3000
This application is also deployed on Vercel : https://mintly-v2.vercel.app/

# Front-end

This using the following stack:

-   Language - [TypeScript](https://www.typescriptlang.org)
-   Styling - [Tailwind CSS](https://tailwindcss.com)
-   Components - [daisyUI](https://daisyui.com/)
-   Linting - [ESLint](https://eslint.org)
-   Formatting - [Prettier](https://prettier.io)

# Blockchain Implementation


## Description

This project is a smart contract based on Solana, using Metaplex Core and Anchor. It allows the creation and management of NFT collections, transfer of NFTs, and management of a jackpot.

## Tech Stack

- **Rust**: Primary programming language for developing the smart contract.
- **Solana**: Blockchain used to deploy and interact with the smart contract.
- **Metaplex Core**: Library used for managing NFTs on Solana.
- **Anchor**: Framework for developing smart contracts on Solana, simplifying development and deployment.

## Features

1. **Creation of NFT collections**
2. **Creation of individual NFTs**
3. **Initialization of a jackpot vault**
4. **Generation of random ticket numbers**
5. **NFT transfer**

## Architecture

### Modeling

The program uses several source files to organize different functionalities. Each main functionality is implemented in a separate file.

- `lib.rs`: Main entry point of the program.
- `mod.rs`: Management module.
- `constants.rs`: Declaration of constants used in the program.
- `error.rs`: Error handling and error messages.
- `initialize_jackpot_vault.rs`: Initialization of the jackpot vault.
- `get_random_ticket_number.rs`: Generation of random ticket numbers.
- `create_nft_v1.rs`: Implementation of individual NFT creation.
- `create_collection_v1.rs`: Implementation of NFT collection creation.
- `transfer_v1.rs`: Implementation of NFT transfer. (not used at this stage)

### PDA (Program Derived Addresses)

In this smart contract, PDAs (Program Derived Addresses) are used to securely manage the jackpot vault. Here's a detailed description of how PDAs are utilized:

A Program Derived Address (PDA) is a special type of address on Solana that is derived deterministically using a program ID and a set of seeds. PDAs are not controlled by any private key, making them ideal for use in smart contracts where security and predictability are crucial.

#### Why Use PDAs for the Jackpot?

1. **Security**: PDAs ensure that only the smart contract can authorize changes to the jackpot vault. This prevents unauthorized access and tampering.
2. **Determinism**: PDAs are derived in a deterministic manner, which means that the same inputs (seeds) will always produce the same PDA. This makes it easy to derive the address of the jackpot vault consistently.
3. **No Private Key Management**: Since PDAs are not controlled by private keys, there is no risk of private key compromise. The smart contract code itself governs access.

#### How PDAs are Used in the Jackpot Vault

1. **Initialization of Jackpot Vault**: During the initialization of the jackpot vault, a PDA is derived using a specific seed and the program ID. This PDA serves as the address of the jackpot vault.
2. **Storing Funds**: Funds meant for the jackpot are stored in the PDA. This ensures that only the smart contract logic can transfer or withdraw these funds.
3. **Access Control**: The smart contract includes logic to ensure that only authorized operations can be performed on the PDA. For example, only certain transactions can withdraw funds from the jackpot vault.

## Installation

To install and deploy this smart contract, you need the following tools:

- Rust and Cargo
- Solana CLI
- Node.js and NPM (for Metaplex tools)
- Anchor CLI

**Within the anchor folder:**

1. Install Rust and Anchor dependencies:

```bash
anchor build
```

2. Deploy the smart contract on Solana:

```bash
anchor deploy
```
Our smart contract is dployed on the devnet: [Smart contract link](https://solscan.io/account/FVSuQdcaUMz8QyEjZ6rYUVpagqhzBBNv54JTNdhN3x4B?cluster=devnet)


3. Test the smart contract

```bash
anchor test
```

4. To interact with the frontend, copy the IDL and TypeScript types files from `anchor/target/idl` and `anchor/target/types` to the `web/components/idl` folder. This ensures you have the most recent `programId` and types.


## Usage
To interact with the smart contract, use the Solana CLI, Anchor CLI commands, or integrate it into an application using Solana Web3 and Metaplex libraries.
