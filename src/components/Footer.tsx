"use client";

import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-black/10 dark:border-white/10 px-4 sm:px-8 py-6 text-center">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} CryptoGotchi. Built with Next.js on Base L2.
      </p>
    </footer>
  );
}