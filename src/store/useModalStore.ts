import { create } from 'zustand';

interface ModalState {
  showErrorModal: boolean;
  errorMessage: string;
  setShowErrorModal: (show: boolean, message?: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  showErrorModal: false,
  errorMessage: '',
  setShowErrorModal: (show, message = 'Invalid Ethereum address.') =>
    set({ showErrorModal: show, errorMessage: message }),
}));
