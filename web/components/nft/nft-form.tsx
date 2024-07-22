import { ChangeEvent } from 'react';
import Image from 'next/image';

interface CollectionFormData {
    name: string[];
    description: string[];
    files: (File | null)[];
    collectionName: string;
    collectionDescription: string;
}

interface UploadImageProps {
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface DataFieldProps {
    formData: CollectionFormData;
    handleNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleDescriptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface CollectionFieldProps {
    formData: CollectionFormData;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function UploadImage({
    handleFileChange,
}: UploadImageProps): JSX.Element {
    return (
        <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Insert a picture</span>
            </div>
            <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={handleFileChange}
            />
        </label>
    );
}

export function DataField({
    formData,
    handleNameChange,
    handleDescriptionChange,
}: DataFieldProps): JSX.Element {
    return (
        <>
            <input
                type="text"
                name="name"
                placeholder="NFT name"
                className="input input-bordered w-full max-w-xs"
                value={formData.name[formData.name.length - 1]}
                onChange={handleNameChange}
            />
            <input
                type="text"
                name="description"
                placeholder="NFT description"
                className="input input-bordered w-full max-w-xs"
                value={formData.description[formData.description.length - 1]}
                onChange={handleDescriptionChange}
            />
        </>
    );
}

export function CollectionDataField({
    formData,
    handleInputChange,
}: CollectionFieldProps): JSX.Element {
    return (
        <>
            <input
                type="text"
                name="collectionName"
                placeholder="Collection name"
                className="input input-bordered w-full max-w-xs"
                value={formData.collectionName}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="collectionDescription"
                placeholder="Collection description"
                className="input input-bordered w-full max-w-xs"
                value={formData.collectionDescription}
                onChange={handleInputChange}
            />
        </>
    );
}

export function CreateButton(): JSX.Element {
    return (
        <button
            type="submit"
            className="btn w-full max-w-xs bg-violet-800 hover:bg-violet-600 text-white"
        >
            Create your NFT
        </button>
    );
}

export function DisplayImage(file: File): JSX.Element {
    return (
        <Image
            className="mt-8"
            src={URL.createObjectURL(file)}
            width={300}
            height={300}
            alt="NFT"
        />
    );
}
