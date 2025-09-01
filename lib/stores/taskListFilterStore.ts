/**
 * Store for managing which task lists are currently selected/visible
 */

import { create } from 'zustand';

interface TaskListFilterState {
  selectedTaskListIds: Set<string>;
  
  // Actions
  toggleTaskList: (taskListId: string) => void;
  selectTaskList: (taskListId: string) => void;
  deselectTaskList: (taskListId: string) => void;
  selectAll: (taskListIds: string[]) => void;
  deselectAll: () => void;
  isSelected: (taskListId: string) => boolean;
}

export const useTaskListFilterStore = create<TaskListFilterState>((set, get) => ({
  selectedTaskListIds: new Set<string>(),

  toggleTaskList: (taskListId: string) =>
    set(state => {
      const newSelected = new Set(state.selectedTaskListIds);
      if (newSelected.has(taskListId)) {
        newSelected.delete(taskListId);
      } else {
        newSelected.add(taskListId);
      }
      return { selectedTaskListIds: newSelected };
    }),

  selectTaskList: (taskListId: string) =>
    set(state => ({
      selectedTaskListIds: new Set(state.selectedTaskListIds).add(taskListId),
    })),

  deselectTaskList: (taskListId: string) =>
    set(state => {
      const newSelected = new Set(state.selectedTaskListIds);
      newSelected.delete(taskListId);
      return { selectedTaskListIds: newSelected };
    }),

  selectAll: (taskListIds: string[]) =>
    set({ selectedTaskListIds: new Set(taskListIds) }),

  deselectAll: () =>
    set({ selectedTaskListIds: new Set() }),

  isSelected: (taskListId: string) => 
    get().selectedTaskListIds.has(taskListId),
}));
