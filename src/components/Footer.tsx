"use client";

import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-border px-4 sm:px-8 py-6 transition-colors">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} CryptoGotchi. Built with Next.js on Base L2.
        </p>
      </div>
    </footer>
  );
}