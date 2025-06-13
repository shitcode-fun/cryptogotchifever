'use client';

import React from 'react';

interface GlobalErrorProps {
  error: Error;
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  return (
    <div className="container mx-auto p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p role="alert" className="text-destructive mb-4 whitespace-pre-wrap">
        {error.message}
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded transition-colors hover:bg-primary/90 active:scale-95"
      >
        Try again
      </button>
    </div>
  );
}