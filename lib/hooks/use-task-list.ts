import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authManager } from '../auth/nextauth/providers';
import { API_CONFIG } from '../config/api.config';
import { TaskList, UpdateTaskListDto } from '../types/task-list.type';
import { useAuthenticatedQuery } from './use-authenticated-query';

const taskListKeys = {
  all: ['task-list'],
  lists: (userId: string) => [...taskListKeys.all, userId],
  list: (userId: string, listId: string) => [
    ...taskListKeys.lists(userId),
    listId,
  ],
  details: (userId: string, listId: string, taskId: string) => [
    ...taskListKeys.list(userId, listId),
    taskId,
  ],
  toggleActive: (id: string, isActive: boolean) => [
    ...taskListKeys.all,
    'toggle-active',
    id,
    isActive,
  ],
};

export const useTaskList = () => {
  const {
    data: taskList,
    isLoading,
    error,
  } = useAuthenticatedQuery<TaskList[]>({
    queryKey: taskListKeys.all,
    queryFn: async () => {
      const response = await authManager()
        .getHttpClient()
        .get(API_CONFIG.ENDPOINTS.TASK_LIST.GET);
      return response.data;
    },
  });

  return { data: taskList, isLoading, error };
};

export const useCreateTaskList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (title: string) => {
      const response = await authManager()
        .getHttpClient()
        .post(API_CONFIG.ENDPOINTS.TASK_LIST.CREATE, {
          title,
        });
      return response.data;
    },

    onMutate: async (title: string) => {
      // Cancel any outgoing refetches (so they don't overwrite optimistic update)
      await queryClient.cancelQueries({ queryKey: taskListKeys.all });
      // Snapshot the previous value for rollback
      const previousTaskLists = queryClient.getQueryData<TaskList[]>(
        taskListKeys.all
      );

      // Create optimistic task list
      const now = new Date();
      const optimisticTaskList: TaskList = {
        id: `temp-${Date.now()}`, // Temporary ID
        title: title.trim(),
        isActive: true,
        tasks: [],
        user: {
          id: 'temp-user',
          username: 'Current User',
          email: 'user@example.com',
        },
        createdAt: now,
        updatedAt: now,
      };

      // Optimistically update the cache
      queryClient.setQueryData<TaskList[]>(taskListKeys.all, oldData => {
        if (!oldData) return [optimisticTaskList];
        return [...oldData, optimisticTaskList];
      });

      // Return context for potential rollback
      return { previousTaskLists, optimisticTaskList };
    },

    // On success, invalidate to get real data from server
    onSuccess: (data, variables, context) => {
      // Remove the optimistic item and replace with real data
      queryClient.setQueryData<TaskList[]>(taskListKeys.all, oldData => {
        if (!oldData) return [data];
        return oldData.map(item =>
          item.id === context?.optimisticTaskList.id ? data : item
        );
      });

      queryClient.invalidateQueries({ queryKey: taskListKeys.all });
    },

    // On error, rollback the optimistic update
    onError: (error, variables, context) => {
      if (context?.previousTaskLists) {
        queryClient.setQueryData(taskListKeys.all, context.previousTaskLists);
      }
    },

    // refetch after error or success to ensure consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all });
    },
  });
};

export const useToggleTaskListActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, title, isActive }: UpdateTaskListDto) => {
      const response = await authManager()
        .getHttpClient()
        .patch(API_CONFIG.ENDPOINTS.TASK_LIST.TOGGLE_ACTIVE(id, isActive), {
          title,
        });
      return response.data;
    },

    onMutate: async ({ id, isActive }: UpdateTaskListDto) => {
      await queryClient.cancelQueries({ queryKey: taskListKeys.all });
      const previousTaskLists = queryClient.getQueryData<TaskList[]>(
        taskListKeys.all
      );

      queryClient.setQueryData<TaskList[]>(taskListKeys.all, oldData => {
        if (!oldData) return oldData;

        return oldData.map(taskList =>
          taskList.id === id
            ? { ...taskList, isActive } // Update the specific task list
            : taskList
        );
      });

      return { previousTaskLists };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all });
    },

    onError: (error, variables, context) => {
      if (context?.previousTaskLists) {
        queryClient.setQueryData(taskListKeys.all, context.previousTaskLists);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: taskListKeys.all });
    },
  });
};
