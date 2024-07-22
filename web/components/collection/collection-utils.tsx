import Image from 'next/image';
import { FormData } from './collection-feature';

export function DisplayAllNFT(formData: FormData): JSX.Element {
  if (formData.files == null) return <></>;
  const files = [...formData.files].reverse();
  return (
    <>
      <div className="carousel w-full">
        {files.map((file, index) => (
          <div
            className="w-full shadow-xl carousel-item"
            key={`item${index + 1}`}
          >
            {file ? (
              <Image
                id={`item${index + 1}`}
                className="mt-8"
                src={URL.createObjectURL(file)}
                width={350}
                height={350}
                alt="NFT"
              />
            ) : (
              <div id={`item${index + 1}`} className=""></div>
            )}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {files.map((file, index) => (
          <a
            href={`#item${index + 1}`}
            className="btn btn-xs"
            key={`link${index + 1}`}
          >
            {index + 1}
          </a>
        ))}
      </div>
    </>
  );
}

export function AddNftButton(): JSX.Element {
  return (
    <button
      type="submit"
      className="btn w-full max-w-xs bg-violet-800 hover:bg-violet-600 text-white"
    >
      Add a new NFT
    </button>
  );
}

export function CreateCollectionButton(): JSX.Element {
  return (
    <button
      type="submit"
      className="btn w-full max-w-xs bg-violet-800 hover:bg-violet-600 text-white"
    >
      Create your collection
    </button>
  );
}
