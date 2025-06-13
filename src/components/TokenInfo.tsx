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
    return <p>Loading token info...</p>;
  }

  if (error || !name || !symbol || decimals === undefined || !totalSupply) {
    return <p>Error loading token information.</p>;
  }

  const formattedSupply = formatUnits(totalSupply, decimals);
  const formattedBalance =
    isConnected && balance !== undefined
      ? formatUnits(balance, decimals)
      : null;

  return (
    <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-md">
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