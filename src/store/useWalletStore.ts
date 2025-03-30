import { create } from 'zustand';
import { WalletStore } from '~/types';

const initialState = {
  address: null,
  chainId: null,
  isConnected: false,
};

export const useWalletStore = create<WalletStore>((set) => ({
  ...initialState,
  setAddress: (address) =>
    set({
      address,
      isConnected: !!address,
    }),
  setChainId: (chainId) => set({ chainId }),
  reset: () => set(initialState),
}));
