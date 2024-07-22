'use client';

import {
    useState,
    ChangeEvent,
    FormEvent,
    useMemo,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react';
import { clusterApiUrl } from '@solana/web3.js';
import {
    useAnchorWallet,
    useConnection,
    useWallet,
} from '@solana/wallet-adapter-react';
import { WalletButton, useAnchorProvider } from '../solana/solana-provider';
import pinFileToIPFS, {
    convertObjectToFile,
} from '@/components/nft/pin-file-to-IPFS';
import { UploadImage, DataField } from '@/components/nft/nft-form';
import { DisplayAllNFT } from '../collection/collection-utils';
import { IDL } from '../idl/idl';
import type { NftLoteryNoCode } from '../idl/idl';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Program } from '@coral-xyz/anchor';
import * as anchor from '@project-serum/anchor';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import Link from 'next/link';
import OpenAI from 'openai';

export interface FormData {
    name: string[];
    description: string[];
    files: (File | null)[];
    collectionName: string;
    collectionDescription: string;
    collectionFile: File | null;
}

export function CreateNftButton(): JSX.Element {
    return (
        <button
            type="submit"
            className="btn w-full max-w-xs bg-violet-800 hover:bg-violet-600 text-white"
        >
            Create a new NFT
        </button>
    );
}

function checkIfFormDataIsFilled(formData: FormData): boolean {
    if (formData.name[0] == '' || formData.description[0] == '') {
        return false;
    }
    return true;
}

function base64ToFile(base64String: string, fileName: string): File {
    // Decode the Base64 string
    const jsonString = atob(base64String);

    // Convert the JSON string to a byte array
    const byteCharacters = jsonString
        .split('')
        .map((char) => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteCharacters);

    // Create a Blob from the byte array
    const blob = new Blob([byteArray], { type: 'application/json' });

    // Create a File object from the Blob
    const file = new File([blob], fileName, { type: 'application/json' });

    return file;
}

async function generatePicture(formData: FormData) {

    if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
        throw new Error("NEXT_PUBLIC_OPENAI_API_KEY key not defined in .env file");
    }
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });
    const content = `Picture name ${formData.name[0]} with description: ${formData.description[0]}`;
    const dalleAnswer = await openai.images.generate({
        prompt: content,
        model: 'dall-e-3',
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
    });
    console.log(dalleAnswer);

    const base64 = dalleAnswer.data[0].b64_json;
    if (!base64) return;
    const file = base64ToFile(base64, 'image.json');
    console.log('file', file);
    return file;
}

export default function CollectionFeature(): JSX.Element {
    const { publicKey } = useWallet();
    const [formData, setFormData] = useState<FormData>({
        name: [''],
        description: [''],
        files: [null],
        collectionName: '',
        collectionDescription: '',
        collectionFile: null,
    });
    const [collectionPublished, setCollectionPublished] = useState<
        string | boolean
    >(false);

    //INTERACT WITH SMART CONTRACT

    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallet = useAnchorWallet();
    const connection = useConnection();
    const provider = useAnchorProvider();

    const [program, setProgram] = useState<any>(null);

    async function createNft(name: string, uri: string) {
        // if (!provider || !program) return;
        console.log('CREATE NFT 1');

        const asset = anchor.web3.Keypair.generate();
        const tx = await program.methods
            .createNftV1({
                name: name,
                uri: uri,
                plugins: null,
            })
            .accounts({
                asset: asset.publicKey,
                collection: null,
                payer: provider.wallet.publicKey,
                owner: null,
                updateAuthority: null,
                logWrapper: null,
            })
            .signers([asset])
            .rpc();
        console.log('CREATE NFT 2');
        console.log(tx);
        return tx;
    }

    useEffect(() => {
        if (!wallet) return;
        const program = new Program<NftLoteryNoCode>(
            JSON.parse(JSON.stringify(IDL)),
            provider
        );
        setProgram(program);
    }, [wallet, connection]);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newName = [...formData.name];
        newName[newName.length - 1] = value;
        setFormData({
            ...formData,
            name: newName,
        });
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newDescription = [...formData.name];
        newDescription.pop();
        newDescription.push(value);
        setFormData({
            ...formData,
            description: newDescription,
        });
    };

    const handleSubmitNFT = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if (checkIfFormDataIsFilled(formData) == false) return;
        setCollectionPublished('loading');
        console.log('Goes here 1');
        const file = await generatePicture(formData);
        if (file) {
            const tempFile: File = file as File;
            const nftLink = await pinFileToIPFS(tempFile);
            const jsonFile = convertObjectToFile({
                name: formData.name[0],
                description: formData.description[0],
                image: nftLink,
                collection_name: formData.collectionName,
                attributes: [],
            });
            const finalUri = await pinFileToIPFS(jsonFile);
            setCollectionPublished(await createNft(formData.name[0], finalUri));
        }
        console.log('Goes here 2');
        setFormData({
            name: [''],
            description: [''],
            files: [null],
            collectionName: '',
            collectionDescription: '',
            collectionFile: null,
        });
    };

    useEffect(() => {
        if (collectionPublished != '') {
            const modal = document.getElementById(
                'my_modal_2'
            ) as HTMLDialogElement | null;
            if (modal) {
                modal.showModal();
            }
        }
    }, [collectionPublished]);

    return publicKey ? (
        <div className="">
            <div className="flex items-center">
                <div className="flex flex-col w-full max-w-xs">
                    {formData.files[0] ? (
                        DisplayAllNFT(formData)
                    ) : (
                        <span className="mt-48"></span>
                    )}
                    <form
                        onSubmit={handleSubmitNFT}
                        className="flex flex-col gap-2"
                    >
                        <DataField
                            formData={formData}
                            handleNameChange={handleNameChange}
                            handleDescriptionChange={handleDescriptionChange}
                        />
                        <CreateNftButton />
                    </form>
                </div>
            </div>
            {collectionPublished != 'loading' && collectionPublished != '' ? (
                <Fireworks autorun={{ speed: 2, duration: 5000 }} />
            ) : null}
            {collectionPublished != '' ? (
                <>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            {collectionPublished != 'loading' ? (
                                <>
                                    <h3 className="font-bold text-lg">
                                        Nft minted!
                                    </h3>
                                    <p className="py-4">
                                        Well done you have created an NFT! The
                                        nft will be available soon in your
                                        wallet. The link to your nft on solscan
                                        is:
                                        <Link
                                            href={`https://solscan.io/tx/${collectionPublished}?cluster=devnet`}
                                            className="text-blue-500"
                                        >
                                            {' '}
                                            {collectionPublished}{' '}
                                        </Link>
                                    </p>
                                </>
                            ) : (
                                <div className="flex justify-center items-center">
                                    <div className="flex flex-col justify-center items-center">
                                        <h3 className="font-bold text-lg">
                                            We are minting your collection!
                                        </h3>
                                        <span className="py-10 loading loading-spinner loading-lg"></span>
                                    </div>
                                </div>
                            )}
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                </>
            ) : null}
        </div>
    ) : (
        <div className="max-w-4xl mx-auto">
            <div className="hero py-[64px]">
                <div className="hero-content text-center">
                    <WalletButton />
                </div>
            </div>
        </div>
    );
}
