import { ETokenType } from '~/enums/tokenType';

export interface WalletStore {
  address: string | null;
  chainId: number | null;
  isConnected: boolean;
  setAddress: (address: string | null) => void;
  setChainId: (chainId: number | null) => void;
  reset: () => void;
}

export interface TokenInfo {
  symbol: ETokenType;
  address: string;
  balance: bigint;
  allowance: bigint;
}
