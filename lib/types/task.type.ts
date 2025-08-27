import { User } from "./user.type";

export interface TaskList {
  id: string;
  title: string;
  user: User;
  tasks: Task[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  /** the id of the task */
  id?: string;

  /** the title of the task */
  title: string;

  /** the description of the task */
  description?: string;

  /** whether the task is completed */
  isCompleted: boolean;

  /** whether the task is starred */
  isStarred: boolean;

  /** the list task belongs to */
  list: TaskList;

  /** the due date of the task */
  dueDate: Date;

  /** the date the task was created */
  createdAt: Date;

  /** the date the task was updated */
  updatedAt: Date;
}
