"use client";

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { isAddress, parseUnits } from 'ethers';

import TokenABI from '@/abis/Token.json';
import { TOKEN_ADDRESS } from '@/lib/constants';
import { useToast } from '@/components/ui/Toast';

export function TokenApproval() {
  const { address: owner, isConnected } = useAccount();
  const { data: decimals } = useReadContract({
    address: TOKEN_ADDRESS,
    abi: TokenABI,
    functionName: 'decimals',
  });
  const {
    writeContract,
    isLoading: isApproving,
    isSuccess,
    error,
  } = useWriteContract();
  const showToast = useToast();

  const [spender, setSpender] = useState('');
  const [amount, setAmount] = useState('');
  const [formError, setFormError] = useState('');

  const handleApprove = () => {
    setFormError('');
    if (!isConnected || !owner) {
      setFormError('Wallet not connected');
      return;
    }
    if (decimals === undefined) {
      setFormError('Token decimals not loaded');
      return;
    }
    if (!isAddress(spender)) {
      setFormError('Invalid spender address');
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) < 0) {
      setFormError('Invalid amount');
      return;
    }

    const parsedAmount = parseUnits(amount, decimals);
    writeContract({
      address: TOKEN_ADDRESS,
      abi: TokenABI,
      functionName: 'approve',
      args: [spender, parsedAmount],
    });
  };

  useEffect(() => {
    if (isSuccess) showToast('Approval successful!', 'success');
    if (error) showToast((error as Error).message, 'error');
  }, [isSuccess, error, showToast]);

  return (
    <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-md mt-6 transition-shadow hover:shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Approve Tokens</h2>
      <div className="mb-4">
        <label htmlFor="spender" className="block text-sm font-medium mb-1">
          Spender Address
        </label>
        <input
          id="spender"
          name="spender"
          type="text"
          aria-label="Spender address"
          value={spender}
          onChange={e => setSpender(e.target.value)}
          placeholder="0x..."
          className="w-full p-2 mb-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium mb-1">
          Amount
        </label>
        <input
          id="amount"
          name="amount"
          type="text"
          aria-label="Amount to approve"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="0.0"
          className="w-full p-2 mb-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
      </div>
      {formError && (
        <p role="alert" className="text-destructive mb-2">
          {formError}
        </p>
      )}
      <button
        type="button"
        disabled={isApproving}
        onClick={handleApprove}
        className="w-full bg-primary text-primary-foreground py-2 rounded disabled:opacity-50 transition-colors hover:bg-primary/90 active:scale-95"
      >
        {isApproving ? 'Approving...' : 'Approve'}
      </button>
    </div>
  );
}