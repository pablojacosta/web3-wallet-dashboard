import { erc20Abi, formatUnits, parseUnits } from 'viem';
import { useReadContract, useTransaction, useWriteContract } from 'wagmi';
import { ETokenType } from '~/enums/tokenType';
import { useModalStore } from '~/store/useModalStore';
import { useWalletStore } from '~/store/useWalletStore';
import { validateWalletAddress } from '~/utils/validation';

export const useTokenContract = (token: ETokenType) => {
  // TODO: use address constants from config file
  const TokenAddresses = {
    DAI: process.env.NEXT_PUBLIC_DAI_TOKEN_ADDRESS,
    USDC: process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS,
  } as const;

  const { address: walletAddress } = useWalletStore();
  const { setShowErrorModal } = useModalStore();

  const address = TokenAddresses[token] as `0x${string}`;

  const validatedWalletAddress = validateWalletAddress(walletAddress);

  const isQueryEnabled = Boolean(validatedWalletAddress && address);

  const { data: balance, refetch: refetchBalance } = useReadContract({
    address,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: validatedWalletAddress ? [validatedWalletAddress] : undefined,
    query: {
      enabled: isQueryEnabled,
    },
  });

  const { data: allowance, refetch: refetchAllowance } = useReadContract({
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

  const { writeContract: approve, data: approveData } = useWriteContract();

  const { writeContract: transfer, data: transferData } = useWriteContract();

  const { isLoading: isApproving } = useTransaction({
    hash: approveData,
  });

  const { isLoading: isTransferring } = useTransaction({
    hash: transferData,
  });

  const formattedBalance = balance ? formatUnits(balance, decimals ?? 0) : '0';
  const formattedAllowance = allowance ? formatUnits(allowance, decimals ?? 0) : '0';

  const safeApprove = (spender: string, amount: string) => {
    const validatedSpender = validateWalletAddress(spender);
    if (!validatedSpender) {
      setShowErrorModal(true, 'Invalid spender address.');
      return;
    }

    try {
      approve({
        address,
        abi: erc20Abi,
        functionName: 'approve',
        args: [validatedSpender, parseUnits(amount, decimals ?? 0)],
      });
    } catch (error) {
      console.error('Approval failed:', error);
      setShowErrorModal(true, 'Transaction failed. Please check the spender address.');
    }
  };

  const safeTransfer = async (to: string, amount: string) => {
    const validatedTo = validateWalletAddress(to);
    if (!validatedTo) {
      setShowErrorModal(true, 'Invalid recipient address.');
      return;
    }

    try {
      transfer({
        address,
        abi: erc20Abi,
        functionName: 'transfer',
        args: [validatedTo, parseUnits(amount, decimals ?? 0)],
      });
    } catch (error) {
      console.error('Transfer failed:', error);
      setShowErrorModal(true, 'Transaction failed. Please check the recipient address.');
    }
  };

  return {
    balance: balance?.toString() || '0',
    formattedBalance,
    allowance: allowance?.toString() || '0',
    decimals: decimals?.toString() || '0',
    formattedAllowance,
    approve: safeApprove,
    transfer: safeTransfer,
    isApproving,
    isTransferring,
    refetchBalance,
    refetchAllowance,
    refetchDecimals,
  };
};
