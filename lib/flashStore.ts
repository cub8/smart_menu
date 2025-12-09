import { create } from "zustand";

export type Flash = {
  type: "success" | "error";
  payload?: unknown;
};

interface FlashState {
  flash: Flash | null;
  setFlash: (flash: Flash) => void;
  clearFlash: () => void;
}

export const useFlashStore = create<FlashState>((set) => ({
  flash: null,
  setFlash: (flash) => set({ flash }),
  clearFlash: () => set({ flash: null }),
}));
