import { Circle } from 'lucide-react';
import { Task } from '../../../lib/types/task.type';

interface TaskDisplayProps {
  task: Task;
  className?: string;
  onEdit: (task: Task) => void;
}

export default function TaskDisplay({ task, onEdit, className }: TaskDisplayProps) {
  return (
    <div
      className={`flex items-center gap-6 cursor-pointer hover:bg-focus rounded-lg p-2 transition-colors duration-200 ${className}`}
      onClick={() => onEdit(task)}
    >
      <Circle size={20} className="" />
      <span className="text-gray-900 flex-1">{task.title}</span>
    </div>
  );
}
