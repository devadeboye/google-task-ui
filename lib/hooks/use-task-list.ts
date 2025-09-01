import { authManager } from '../auth/nextauth/providers';
import { TaskList } from '../types/task-list.type';
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
};

export const useTaskList = () => {
  const {
    data: taskList,
    isLoading,
    error,
  } = useAuthenticatedQuery<TaskList[]>({
    queryKey: taskListKeys.all,
    queryFn: async () => {
      const response = await authManager().getHttpClient().get('/task-list');
      return response.data;
    },
  });

  return { data: taskList, isLoading, error };
};
