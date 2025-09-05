import { Circle, ListPlus } from 'lucide-react';
import { TaskList } from '../../../lib/types/task-list.type';

interface TaskboardProps {
  taskList: TaskList;
}

export default function Taskboard({ taskList }: TaskboardProps) {
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl w-full">
      <h2 className="text-lg">{taskList.title}</h2>

      <div className="flex items-center gap-6 text-primary">
        <ListPlus />
        <div>Add a task</div>
      </div>

      <div className="flex flex-col gap-2">
        {taskList.tasks.map(task => (
          <div className="flex items-center gap-6" key={task.id}>
            <Circle size={20} />
            <span>{task.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
