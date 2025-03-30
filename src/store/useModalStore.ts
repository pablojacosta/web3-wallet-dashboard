import { create } from 'zustand';
import { EMessageStatus } from '~/enums';
import { ModalMessage } from '~/types';

interface ModalStore {
  showModal: boolean;
  message: ModalMessage;
  messageStatus: EMessageStatus;
  setShowModal: (show: boolean, message?: ModalMessage, status?: EMessageStatus) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  showModal: false,
  message: '',
  messageStatus: EMessageStatus.ERROR,
  setShowModal: (show, message?: ModalMessage, status?: EMessageStatus) =>
    set({ showModal: show, message, messageStatus: status }),
}));
