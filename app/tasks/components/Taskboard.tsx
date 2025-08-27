import { Circle, ListPlus } from 'lucide-react';
import { Task } from '../../../lib/types/task.type';

interface TaskboardProps {
  tasks: Task[];
}

export default function Taskboard() {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl w-full">
      <h2 className="text-lg">My Tasks</h2>

      <div className="flex items-center gap-6 text-primary">
        <ListPlus />
        <div>Add a task</div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-6">
          <Circle size={20} />
          <span>Task 1</span>
        </div>
        <div className="flex items-center gap-6">
          <Circle size={20} />
          <span>Task 2</span>
        </div>
        <div className="flex items-center gap-6">
          <Circle size={20} />
          <span>Task 3</span>
        </div>
      </div>
    </div>
  );
}
