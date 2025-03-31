import { sepolia, mainnet } from 'wagmi/chains';
import { Constants } from '~/types';

// Mainnet has been added solely for testing the dApp's network switching functionality

const constants: Constants = {
  DAI_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_DAI_TOKEN_ADDRESS as string,
  USDC_TOKEN_ADDRESS: process.env.NEXT_PUBLIC_USDC_TOKEN_ADDRESS as string,
  EVENTS_STORAGE_KEY: process.env.NEXT_PUBLIC_EVENTS_STORAGE_KEY as string,
  SUPPORTED_CHAINS: [sepolia, mainnet] as const,
};

export const getConstants = (): Constants => {
  return constants;
};
