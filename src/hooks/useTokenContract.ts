import { useEffect, useState } from 'react';
import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { useReadContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { EErrorMessage, EMessageStatus, ESuccessMessage, ETokenType, ETransactionType } from '~/enums';
import { useEventStore } from '~/store/useEventStore';
import { useModalStore } from '~/store/useModalStore';
import { useWalletStore } from '~/store/useWalletStore';
import { validateWalletAddress } from '~/utils/validation';
import { useTransactionHandler } from './useTransactionHandler';

const extendedErc20Abi = [
  ...erc20Abi,
  {
    type: 'function',
    name: 'mint',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [],
  },
];

export const useTokenContract = (token: ETokenType) => {
  // TODO: use address constants from config file
  const TokenAddresses = {
    DAI: process.env.NEXT_PUBLIC_DAI_TOKEN_ADDRESS,
    USDC: process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS,
  } as const;

  const { address: walletAddress } = useWalletStore();
  const { executeTransaction } = useTransactionHandler();
  const { setShowModal } = useModalStore();
  const { addEvent } = useEventStore();

  const [eventRecipient, setEventRecipient] = useState('');
  const [eventAmount, setEventAmount] = useState('');

  const address = TokenAddresses[token] as `0x${string}`;
  const validatedWalletAddress = validateWalletAddress(walletAddress);

  const isQueryEnabled = Boolean(validatedWalletAddress && address);

  const {
    data: balance,
    refetch: refetchBalance,
    isLoading: isLoadingBalance,
  } = useReadContract({
    address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: validatedWalletAddress ? [validatedWalletAddress] : undefined,
    query: {
      enabled: isQueryEnabled,
    },
  });

  const {
    data: allowance,
    refetch: refetchAllowance,
    isLoading: isLoadingAllowance,
  } = useReadContract({
    address,
    abi: erc20Abi,
    functionName: 'allowance',
    args: validatedWalletAddress ? [validatedWalletAddress, address] : undefined,
    query: {
      enabled: isQueryEnabled,
    },
  });

  const { data: decimals, refetch: refetchDecimals } = useReadContract({
    address,
    abi: erc20Abi,
    functionName: 'decimals',
    query: {
      enabled: isQueryEnabled,
    },
  });

  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: transfer, data: transferHash } = useWriteContract();
  const { writeContract: mint, data: mintHash } = useWriteContract();

  const { isLoading: isApproving } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isTransferring } = useWaitForTransactionReceipt({ hash: transferHash });
  const { isLoading: isMinting } = useWaitForTransactionReceipt({ hash: mintHash });

  const formattedBalance = balance && decimals !== undefined ? formatUnits(balance, decimals) : '0';
  const formattedAllowance = allowance && decimals !== undefined ? formatUnits(allowance, decimals) : '0';

  useEffect(() => {
    if (approveHash && !isApproving && validatedWalletAddress) {
      setShowModal(true, ESuccessMessage.APPROVE, EMessageStatus.SUCCESS);

      refetchAllowance();

      addEvent({
        type: ETransactionType.APPROVE,
        token,
        amount: eventAmount,
        sender: validatedWalletAddress,
        recipient: eventRecipient,
        hash: approveHash,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approveHash, isApproving]);

  useEffect(() => {
    if (transferHash && !isTransferring && validatedWalletAddress) {
      setShowModal(true, ESuccessMessage.TRANSFER, EMessageStatus.SUCCESS);

      refetchBalance();

      addEvent({
        type: ETransactionType.TRANSFER,
        token,
        amount: eventAmount,
        sender: validatedWalletAddress,
        recipient: eventRecipient,
        hash: transferHash,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferHash, isTransferring]);

  useEffect(() => {
    if (mintHash && !isMinting) {
      setShowModal(true, ESuccessMessage.MINT, EMessageStatus.SUCCESS);

      refetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mintHash, isMinting]);

  const safeApprove = (spender: string, amount: string) => {
    const validatedSpender = validateWalletAddress(spender);

    if (!validatedSpender) {
      setShowModal(true, EErrorMessage.INVALID_SPENDER, EMessageStatus.ERROR);
      return;
    }

    executeTransaction(
      () =>
        approve({
          address,
          abi: erc20Abi,
          functionName: 'approve',
          args: [validatedSpender, parseUnits(amount, decimals ?? 0)],
        }),
      refetchAllowance,
    );

    setEventAmount(amount);
    setEventRecipient(spender);
  };

  const safeTransfer = (recipient: string, amount: string) => {
    const validatedRecipient = validateWalletAddress(recipient);

    if (!validatedRecipient) {
      setShowModal(true, EErrorMessage.INVALID_RECIPIENT, EMessageStatus.ERROR);
      return;
    }

    executeTransaction(
      () =>
        transfer({
          address,
          abi: erc20Abi,
          functionName: 'transfer',
          args: [validatedRecipient, parseUnits(amount, decimals ?? 0)],
        }),
      refetchBalance,
    );

    setEventAmount(amount);
    setEventRecipient(recipient);
  };

  const safeMint = (recipient: string, amount: string) => {
    const validatedRecipient = validateWalletAddress(recipient);
    if (!validatedRecipient) {
      setShowModal(true, EErrorMessage.INVALID_RECIPIENT, EMessageStatus.ERROR);
      return;
    }

    if (!amount) {
      setShowModal(true, EErrorMessage.NO_MINT_AMOUNT, EMessageStatus.ERROR);
      return;
    }

    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber) || amountNumber <= 0) {
      setShowModal(true, EErrorMessage.NO_VALID_AMOUNT, EMessageStatus.ERROR);
      return;
    }

    executeTransaction(
      () =>
        mint({
          address,
          abi: extendedErc20Abi,
          functionName: 'mint',
          args: [validatedRecipient, parseUnits(amount, decimals ?? 0)],
        }),
      refetchBalance,
    );
  };

  return {
    balance: balance?.toString() || '0',
    formattedBalance,
    allowance: allowance?.toString() || '0',
    decimals: decimals?.toString() || '0',
    formattedAllowance,
    approve: safeApprove,
    transfer: safeTransfer,
    mint: safeMint,
    isApproving,
    isTransferring,
    isMinting,
    refetchBalance,
    refetchAllowance,
    refetchDecimals,
    isLoadingBalance,
    isLoadingAllowance,
  };
};
