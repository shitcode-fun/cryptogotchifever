import React from 'react';
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto p-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  );
}