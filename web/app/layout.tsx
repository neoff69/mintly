import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';

export const metadata = {
    title: 'Mintly',
    description: 'Create your NFTs and collections on Solana.',
};

const links: { label: string; path: string }[] = [
    { label: 'Nft', path: '/nft' },
    { label: 'Collection', path: '/collection' },
    { label: 'Ai', path: '/ai' },
];

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="">
                <ReactQueryProvider>
                    <SolanaProvider>
                        <UiLayout links={links}>{children}</UiLayout>
                    </SolanaProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
