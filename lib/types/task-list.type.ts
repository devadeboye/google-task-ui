import { Task } from './task.type';

export interface TaskList {
  id: string;
  title: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
  tasks: Task[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateTaskListDto = Pick<TaskList, 'id' | 'title' | 'isActive'>;
