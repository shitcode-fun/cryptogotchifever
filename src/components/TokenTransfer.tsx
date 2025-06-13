"use client";

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { isAddress, parseUnits } from 'ethers';
import TokenABI from '@/abis/Token.json';
import { TOKEN_ADDRESS } from '@/lib/constants';
import { useToast } from '@/components/ui/Toast';

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
  const showToast = useToast();

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

  useEffect(() => {
    if (isSuccess) showToast('Transfer successful!', 'success');
    if (error) showToast((error as Error).message, 'error');
  }, [isSuccess, error, showToast]);

  return (
    <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-md mt-6 transition-shadow hover:shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Transfer Tokens</h2>
      <div className="mb-4">
        <label htmlFor="recipient" className="block text-sm font-medium mb-1">
          Recipient Address
        </label>
        <input
          id="recipient"
          name="recipient"
          type="text"
          aria-label="Recipient address"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
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
          aria-label="Amount to transfer"
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
        disabled={isTransferring}
        onClick={handleTransfer}
        className="w-full bg-primary text-primary-foreground py-2 rounded disabled:opacity-50 transition-colors hover:bg-primary/90 active:scale-95"
      >
        {isTransferring ? 'Transferring...' : 'Transfer'}
      </button>
    </div>
  );
}