/**
 * Simple menu store for sidebar state
 */

import { create } from 'zustand';

interface MenuState {
  isOpen: boolean;
  toggle: () => void;
  toggleMenu: () => void;
  setOpen: (open: boolean) => void;
}

export const useMenuStore = create<MenuState>(set => ({
  isOpen: true,
  toggle: () => set(state => ({ isOpen: !state.isOpen })),
  toggleMenu: () => set(state => ({ isOpen: !state.isOpen })),
  setOpen: (open: boolean) => set({ isOpen: open }),
}));
