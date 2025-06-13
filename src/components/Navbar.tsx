"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 backdrop-blur-sm bg-background/80 border-b border-border px-4 sm:px-8 h-16 transition-colors">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight hover:text-primary transition-colors">
          CryptoGotchi
        </Link>
        <ConnectButton />
      </div>
    </nav>
  );
}