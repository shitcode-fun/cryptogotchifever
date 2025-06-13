"use client";

import { useState } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { isAddress, parseUnits } from 'ethers';
import TokenABI from '@/abis/Token.json';
import { TOKEN_ADDRESS } from '@/lib/constants';

export function TokenTransfer() {
  const { address: userAddress, isConnected } = useAccount();
  const { data: decimals } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'decimals',
  });
  const {
    writeContract,
    isLoading: isTransferring,
    isSuccess,
    error,
  } = useWriteContract();

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [formError, setFormError] = useState('');

  const handleTransfer = () => {
    setFormError('');
    if (!isConnected || !userAddress) {
      setFormError('Wallet not connected');
      return;
    }
    if (decimals === undefined) {
      setFormError('Token decimals not loaded');
      return;
    }
    if (!isAddress(recipient)) {
      setFormError('Invalid recipient address');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setFormError('Invalid amount');
      return;
    }

    const parsedAmount = parseUnits(amount, decimals);
    writeContract({
      address: TOKEN_ADDRESS,
      abi: TokenABI,
      functionName: 'transfer',
      args: [recipient, parsedAmount],
    });
  };

  return (
    <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4">Transfer Tokens</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Recipient Address</label>
        <input
          type="text"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          className="w-full p-2 border border-border rounded"
          placeholder="0x..."
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Amount</label>
        <input
          type="text"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full p-2 border border-border rounded"
          placeholder="0.0"
        />
      </div>
      {formError && <p className="text-destructive mb-2">{formError}</p>}
      {error && <p className="text-destructive mb-2">{(error as Error).message}</p>}
      {isSuccess && <p className="text-green-600 mb-2">Transfer successful!</p>}
      <button
        disabled={isTransferring}
        onClick={handleTransfer}
        className="w-full bg-primary text-primary-foreground py-2 rounded disabled:opacity-50"
      >
        {isTransferring ? 'Transferring...' : 'Transfer'}
      </button>
    </div>
  );
}