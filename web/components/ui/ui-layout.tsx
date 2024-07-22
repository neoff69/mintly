'use client';

import { WalletButton } from '../solana/solana-provider';
import * as React from 'react';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import toast, { Toaster } from 'react-hot-toast';

export function UiLayout({
    children,
    links,
}: {
    children: ReactNode;
    links: { label: string; path: string }[];
}) {
    const pathname = usePathname();

    return (
        <div className="h-full flex flex-col">
            <div className="navbar bg-base-300 text-neutral-content flex-col md:flex-row space-y-2 md:space-y-0">
                <div className="flex-1">
                    <Link
                        className="btn btn-ghost normal-case text-4xl text-violet-600"
                        href="/"
                    >
                        Mintly
                        <span className="text-white">.</span>
                    </Link>
                    <ul className="menu menu-horizontal px-1 space-x-2">
                        {links.map(({ label, path }) => (
                            <li key={path}>
                                <Link
                                    className={
                                        pathname.startsWith(path)
                                            ? 'active'
                                            : ''
                                    }
                                    href={path}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-none space-x-2">
                    <WalletButton />
                </div>
            </div>
            <div className="flex-grow mx-4 lg:mx-auto">
                <Suspense
                    fallback={
                        <div className="text-center my-32">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    }
                >
                    {children}
                </Suspense>
                <Toaster position="bottom-right" />
            </div>
        </div>
    );
}

export function AppModal({
    children,
    title,
    hide,
    show,
    submit,
    submitDisabled,
    submitLabel,
}: {
    children: ReactNode;
    title: string;
    hide: () => void;
    show: boolean;
    submit?: () => void;
    submitDisabled?: boolean;
    submitLabel?: string;
}) {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useEffect(() => {
        if (!dialogRef.current) return;
        if (show) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [show, dialogRef]);

    return (
        <dialog className="modal" ref={dialogRef}>
            <div className="modal-box space-y-5">
                <h3 className="font-bold text-lg">{title}</h3>
                {children}
                <div className="modal-action">
                    <div className="join space-x-2">
                        {submit ? (
                            <button
                                className="btn btn-xs lg:btn-md btn-primary"
                                onClick={submit}
                                disabled={submitDisabled}
                            >
                                {submitLabel || 'Save'}
                            </button>
                        ) : null}
                        <button onClick={hide} className="btn">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </dialog>
    );
}

function NFTButton(): JSX.Element {
    return (
        <button className="btn btn-lg btn-wide text-center bg-violet-800 text-white hover:bg-violet-600">
            Create your NFT
        </button>
    );
}

export function AppHero({
    children,
    title,
    subtitle,
    balance,
    remainingTickets,
}: {
    children?: ReactNode;
    title: ReactNode;
    subtitle: ReactNode;
    balance: number;
    remainingTickets: number;
}) {
    return (
        <div className="hero py-[64px]">
            <div className="hero-content text-center max-w-2xl">
                <div className=" pt-10">
                    {typeof title === 'string' ? (
                        <h1 className="text-5xl font-bold  text-violet-300">
                            {title}
                        </h1>
                    ) : (
                        title
                    )}
                    {typeof subtitle === 'string' ? (
                        <p className="pt-20 text-xl text-violet-100 ">
                            {subtitle}
                        </p>
                    ) : (
                        subtitle
                    )}
                    {balance != -1 ? (
                        <p className="pt-20 text-xl text-violet-100 ">
                            {' '}
                            The cashprize of the lottery is actually{' '}
                            {(balance / 1000000000).toFixed(2)} SOL your chance to win per
                            transaction is {((1 / remainingTickets) * 100).toFixed(2)}%
                        </p>
                    ) : null}

                    {children}
                    <Link href="/nft">
                        {' '}
                        <button
                            className="mt-20 btn btn-lg btn-wide text-center
               bg-violet-800 text-white hover:bg-violet-600"
                        >
                            Create your NFT
                        </button>
                    </Link>
                    <Link href="/collection">
                        {' '}
                        <button
                            className="ml-4 btn btn-lg btn-wide text-center
               bg-violet-800 text-white hover:bg-violet-600"
                        >
                            Create your Collection
                        </button>
                    </Link>
                    <Link href="/ai">
                        {' '}
                        <button
                            className="mt-4 btn btn-lg btn-wide text-center
               bg-violet-800 text-white hover:bg-violet-600"
                        >
                            Create your NFT with AI
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function ellipsify(str = '', len = 4) {
    if (str.length > 30) {
        return (
            str.substring(0, len) +
            '..' +
            str.substring(str.length - len, str.length)
        );
    }
    return str;
}

export function useTransactionToast() {
    return (signature: string) => {
        toast.success(
            <div className={'text-center'}>
                <div className="text-lg">Transaction sent</div>
            </div>
        );
    };
}
