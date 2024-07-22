'use client';

import { useState, ChangeEvent, FormEvent, useMemo, useEffect } from 'react';
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
import {
    UploadImage,
    DataField,
    CollectionDataField,
    DisplayImage,
} from '@/components/nft/nft-form';
import {
    AddNftButton,
    CreateCollectionButton,
    DisplayAllNFT,
} from './collection-utils';
import { IDL } from '../idl/idl';
import type { NftLoteryNoCode } from '../idl/idl';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Program } from '@coral-xyz/anchor';
import * as anchor from '@project-serum/anchor';
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';
import Link from 'next/link';

export interface FormData {
    name: string[];
    description: string[];
    files: (File | null)[];
    collectionName: string;
    collectionDescription: string;
    collectionFile: File | null;
}

function checkIfFormDataIsFilled(formData: FormData): boolean {
    if (
        formData.name.length == 1 ||
        formData.description.length == 1 ||
        formData.files.length == 1
    ) {
        return false;
    } else if (
        formData.collectionDescription == '' ||
        !formData.collectionFile ||
        formData.collectionName == ''
    ) {
        return false;
    }
    return true;
}

async function getCollectionUri(formData: FormData): Promise<string> {
    const imageUri = await pinFileToIPFS(formData.collectionFile as File);
    const jsonFile = convertObjectToFile({
        name: formData.collectionName,
        description: formData.collectionDescription,
        image: imageUri,
        attributes: [],
    });
    const collectionUri = await pinFileToIPFS(jsonFile);
    return collectionUri;
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
        if (!provider || !program) return;
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
        console.log('Your transaction signature NFT ', tx);
    }

    async function createCollection(name: string, uri: string) {
        if (!provider || !program) return;
        const collection = anchor.web3.Keypair.generate();
        const tx = await program.methods
            .createCollectionV1({
                name: name,
                uri: uri,
                plugins: null,
            })
            .accounts({
                collection: collection.publicKey,
                payer: provider.wallet.publicKey,
                updateAuthority: null,
            })
            .signers([collection])
            .rpc();
        console.log('Your transaction signature Collection ', tx);
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

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = formData.files;
        const len = files.length - 1;
        if (e.target.files == null) return;
        files.pop();
        files.push(e.target.files[0]);
        files[len] = e.target.files[0];
        setFormData({
            ...formData,
            files: files,
        });
    };

    const handleCollectionFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files == null) return;
        setFormData({
            ...formData,
            collectionFile: e.target.files[0],
        });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmitNFT = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.files[formData.files.length - 1]) return;
        if (formData.name[formData.name.length - 1] == '') return;
        if (formData.description[formData.description.length - 1] == '') return;
        const tempName = [...formData.name];
        tempName.push('');
        const tempDescription = [...formData.description];
        tempDescription.push('');
        const tempFiles = [...formData.files];
        tempFiles.push(null);
        setFormData({
            ...formData,
            name: tempName,
            description: tempDescription,
            files: tempFiles,
        });
    };

    const handleSubmitCollection = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (checkIfFormDataIsFilled(formData) == false) return;
        setCollectionPublished('loading');

        const collectionUri = await getCollectionUri(formData);
        const collectionTx = await createCollection(
            formData.collectionName,
            collectionUri
        );
        for (let i = 0; i < formData.files.length; i++) {
            if (formData.files[i]) {
                const tempFile: File = formData.files[i] as File;
                const nftLink = await pinFileToIPFS(tempFile);
                const jsonFile = convertObjectToFile({
                    name: formData.name[i],
                    description: formData.description[i],
                    image: nftLink,
                    collection_name: formData.collectionName,
                    collection: collectionTx,
                    attributes: [],
                });
                const finalUri = await pinFileToIPFS(jsonFile);
                await createNft(formData.name[i], finalUri);
            }
        }
        setCollectionPublished(collectionTx);
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
                        <UploadImage handleFileChange={handleFileChange} />
                        <DataField
                            formData={formData}
                            handleNameChange={handleNameChange}
                            handleDescriptionChange={handleDescriptionChange}
                        />
                        <AddNftButton />
                    </form>
                    {formData.collectionFile ? (
                        DisplayImage(formData.collectionFile)
                    ) : (
                        <></>
                    )}
                    <form
                        onSubmit={handleSubmitCollection}
                        className="flex flex-col gap-2 mt-10"
                    >
                        <UploadImage
                            handleFileChange={handleCollectionFileChange}
                        />
                        <CollectionDataField
                            formData={formData}
                            handleInputChange={handleInputChange}
                        />
                        <CreateCollectionButton />
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
                                        Collection minted!
                                    </h3>
                                    <p className="py-4">
                                        Well done you have created an NFT
                                        collection! The nfts will be available
                                        soon in your wallet. The link to your
                                        collection on solscan is:
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
