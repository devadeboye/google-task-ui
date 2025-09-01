/**
 * Task type definitions
 */

export interface Task {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  isStarred: boolean;
  dueDate?: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
