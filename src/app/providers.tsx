'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains'; 
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

// This is a placeholder WalletConnect Project ID. It must remain here to avoid build errors if the environment variable is not set yet.
const WALLETCONNECT_PROJECT_ID = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '7ab5a4842a5dfe979ced738203d2729c';

const queryClient = new QueryClient();

const ProvidersInner = ({ children }: { children: React.ReactNode }) => {
  const wagmiConfig = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return getDefaultConfig({
      appName: 'CryptoGotchi',
      projectId: WALLETCONNECT_PROJECT_ID,
      chains: [baseSepolia as any, base as any],
    }) as any;
  }, []);

  if (!wagmiConfig) {
    return null;
  }

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact" // 'compact' | 'wide'
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const Providers = dynamic(() => Promise.resolve(ProvidersInner), { ssr: false }); 