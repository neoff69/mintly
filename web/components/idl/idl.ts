import { PublicKey } from '@solana/web3.js';
import type { NftLoteryNoCode } from './nft_lotery_no_code.ts';
import IDL from './nft_lotery_no_code.json';

export { NftLoteryNoCode, IDL };

export const PROGRAM_ID = new PublicKey(
    'FVSuQdcaUMz8QyEjZ6rYUVpagqhzBBNv54JTNdhN3x4B'
);
