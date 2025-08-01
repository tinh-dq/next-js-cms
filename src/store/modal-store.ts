/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface ModalState {
  activeModal: string | null;
  modalData: any | null;
  callback: void | null;
  openModal: (modalName: string, options?: { data?: any; callback?: void }) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  modalData: null,
  callback: null,
  openModal: (modalName: string, options?: { data?: any; callback?: void }) =>
    set({ activeModal: modalName, modalData: options?.data, callback: options?.callback }),

  closeModal: () => set({ activeModal: null, modalData: null, callback: null }),
}));
