'use client';

import { TokenInfo } from '@/components/TokenInfo';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start flex-1 px-4 sm:px-8 bg-background">
      <h1 className="text-4xl font-bold mb-8">CryptoGotchi Token Dashboard</h1>
      <TokenInfo />
    </main>
  );
}
