import { EErrorMessage, ESuccessMessage, ETokenType } from '~/enums';

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

export type ModalMessage = ESuccessMessage | EErrorMessage | '';
