import IconButton from '@/components/ui/IconButton';
import { Circle, ListPlus, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { TaskList } from '../../../lib/types/task-list.type';
import TaskForm from './TaskForm';

interface TaskboardProps {
  taskList: TaskList;
}

export default function Taskboard({ taskList }: TaskboardProps) {
  return (
    <div className="flex flex-col gap-4 bg-white py-4 rounded-2xl w-full h-fit break-inside-avoid mb-8 shadow-xs/5 hover:shadow-sm/35 transition-all duration-300 ease-in-out">
      <div className="flex flex-row items-center justify-between px-4">
        <h2 className="text-lg">{taskList.title}</h2>
        <IconButton icon={<MoreVertical size={18} />} size="small" />
      </div>

      <div className="flex items-center gap-6 text-primary px-4">
        <ListPlus />
        <div>Add a task</div>
      </div>
      <TaskForm />

      <div className="flex flex-col gap-2 px-4">
        {taskList.tasks.length === 0 && (
          <div className="flex flex-col items-center justify-center w-4/5 lg:w-1/2 m-auto text-center gap-4">
            <Image
              src="/asset/images/no_task.png"
              alt="No tasks"
              width={128}
              height={128}
              priority // Preload the image
              className="object-contain"
            />
            <div className="text-lg">No tasks yet</div>
            <p className="text-sm">
              Add your to-dos and keep track of them across Devices
            </p>
          </div>
        )}

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
