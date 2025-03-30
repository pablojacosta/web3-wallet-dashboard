import { EErrorMessage, ESuccessMessage, ETokenType, ETransactionType } from '~/enums';

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

export interface TokenEvent {
  type: ETransactionType;
  token: ETokenType;
  amount: string;
  sender: string;
  recipient: string;
  hash: string;
}
