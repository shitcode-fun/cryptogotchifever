"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-10 bg-background border-b border-black/10 dark:border-white/10 px-4 sm:px-8 h-16 flex items-center justify-between">
      <Link href="/" className="font-semibold text-lg tracking-tight">
        CryptoGotchi
      </Link>
      <div>
        <ConnectButton />
      </div>
    </nav>
  );
} 