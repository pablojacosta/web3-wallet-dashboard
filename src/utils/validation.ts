import { isAddress } from 'viem';

export const validateWalletAddress = (address: string | null): `0x${string}` | null => {
  return address && isAddress(address) ? (address as `0x${string}`) : null;
};
