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
  createdAt: Date;
  updatedAt: Date;
}
