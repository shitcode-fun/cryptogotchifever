"use client";

import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { formatUnits } from 'ethers';
import TokenABI from '@/abis/Token.json';
import { TOKEN_ADDRESS } from '@/lib/constants';

export function TokenInfo() {
  const { address, isConnected } = useAccount();

  const {
    data: name,
    isLoading: isNameLoading,
    isError: isNameError,
  } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'name',
  });

  const {
    data: symbol,
    isLoading: isSymbolLoading,
    isError: isSymbolError,
  } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'symbol',
  });

  const {
    data: decimals,
    isLoading: isDecimalsLoading,
    isError: isDecimalsError,
  } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'decimals',
  });

  const {
    data: totalSupply,
    isLoading: isSupplyLoading,
    isError: isSupplyError,
  } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'totalSupply',
  });

  const {
    data: balance,
    isLoading: isBalanceLoading,
    isError: isBalanceError,
  } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: Boolean(isConnected && address),
  });

  const loading = isNameLoading || isSymbolLoading || isDecimalsLoading || isSupplyLoading;
  const error = isNameError || isSymbolError || isDecimalsError || isSupplyError;

  if (loading) {
    return (
      <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-md animate-pulse space-y-4">
        <div className="h-6 bg-muted rounded w-1/3" />
        <div className="h-4 bg-muted rounded w-2/3" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-4 bg-muted rounded w-full" />
      </div>
    );
  }

  if (error || !name || !symbol || decimals === undefined || !totalSupply) {
    return (
      <div
        role="alert"
        className="max-w-md w-full bg-card p-6 rounded-lg shadow-md border-l-4 border-destructive"
      >
        <p className="text-destructive">Error loading token information.</p>
      </div>
    );
  }

  const formattedSupply = formatUnits(totalSupply, decimals);
  const formattedBalance =
    isConnected && balance !== undefined
      ? formatUnits(balance, decimals)
      : null;

  return (
    <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-md transition-shadow hover:shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Token Information</h2>
      <ul className="space-y-2">
        <li>
          <strong>Name:</strong> {name as string}
        </li>
        <li>
          <strong>Symbol:</strong> {symbol as string}
        </li>
        <li>
          <strong>Total Supply:</strong> {formattedSupply}
        </li>
        {isConnected && (
          <li>
            <strong>Your Balance:</strong> {isBalanceLoading ? 'Loading...' : formattedBalance}
          </li>
        )}
      </ul>
    </div>
  );
}