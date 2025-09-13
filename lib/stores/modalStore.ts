import { create } from 'zustand';

interface ModalState {
  // Task List Modals
  createTaskListModal: boolean;
  editTaskListModal: boolean;

  // Actions
  openCreateTaskListModal: () => void;
  closeCreateTaskListModal: () => void;
  openEditTaskListModal: () => void;
  closeEditTaskListModal: () => void;

  // Utility
  closeAllModals: () => void;
}

export const useModalStore = create<ModalState>(set => ({
  // Initial state - all modals closed
  createTaskListModal: false,
  editTaskListModal: false,

  // Task List Modal Actions
  openCreateTaskListModal: () => set({ createTaskListModal: true }),
  closeCreateTaskListModal: () => set({ createTaskListModal: false }),
  openEditTaskListModal: () => set({ editTaskListModal: true }),
  closeEditTaskListModal: () => set({ editTaskListModal: false }),

  // Utility
  closeAllModals: () =>
    set({
      createTaskListModal: false,
      editTaskListModal: false,
    }),
}));
