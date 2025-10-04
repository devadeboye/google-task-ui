import { Circle } from 'lucide-react';
import { useState } from 'react';
import { TaskList } from '../../../lib/types/task-list.type';
import TaskForm from './TaskForm';
import TaskboardEmptyState from './TaskboardEmptyState';
import TaskboardHeader from './TaskboardHeader';

interface TaskboardProps {
  taskList: TaskList;
}

export default function Taskboard({ taskList }: TaskboardProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  return (
    <div className="flex flex-col gap-4 bg-white py-4 rounded-2xl w-full h-fit break-inside-avoid mb-8 shadow-xs/5 hover:shadow-sm/35 transition-all duration-300 ease-in-out">
      <TaskboardHeader taskList={taskList} setIsAddingTask={setIsAddingTask} />

      {isAddingTask && (
        <TaskForm
          focused={isAddingTask}
          onCancel={() => setIsAddingTask(false)}
        />
      )}

      <div className="flex flex-col gap-2 px-4">
        {taskList.tasks.length === 0 && <TaskboardEmptyState />}

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
