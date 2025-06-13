import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/Skeleton';

const TokenInfo = dynamic(() => import('@/components/TokenInfo'), {
  ssr: false,
  loading: () => <Skeleton className="h-48 w-full max-w-md mx-auto" />,
});

const TokenTransfer = dynamic(() => import('@/components/TokenTransfer'), {
  ssr: false,
  loading: () => <Skeleton className="h-56 w-full max-w-md mx-auto" />,
});

const TokenApproval = dynamic(() => import('@/components/TokenApproval'), {
  ssr: false,
  loading: () => <Skeleton className="h-56 w-full max-w-md mx-auto" />,
});

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-start flex-1 px-4 sm:px-8 py-8 space-y-8 bg-background">
      <h1 className="text-4xl font-bold text-center">CryptoGotchi Token Dashboard</h1>
      <TokenInfo />
      <TokenTransfer />
      <TokenApproval />
    </main>
  );
}
