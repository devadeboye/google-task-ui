import { useState } from 'react';
import { TaskList } from '../../../lib/types/task-list.type';
import TaskDisplay from './TaskDisplay';
import TaskForm from './TaskForm';
import TaskboardEmptyState from './TaskboardEmptyState';
import TaskboardHeader from './TaskboardHeader';

interface TaskboardProps {
  taskList: TaskList;
}

export default function Taskboard({ taskList }: TaskboardProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-4 bg-white py-4 rounded-2xl w-full h-fit break-inside-avoid mb-8 shadow-xs/5 hover:shadow-sm/35 transition-all duration-300 ease-in-out">
      <TaskboardHeader taskList={taskList} setIsAddingTask={setIsAddingTask} />

      {isAddingTask && (
        <TaskForm
          className="px-4"
          focused={isAddingTask}
          mode="create"
          onCancel={() => setIsAddingTask(false)}
          onSave={taskData => {
            console.log('Creating task:', taskData);
            setIsAddingTask(false);
          }}
        />
      )}

      <div className="flex flex-col gap-2">
        {taskList.tasks.length === 0 && (
          <TaskboardEmptyState className="px-4" />
        )}

        {taskList.tasks.map(task => (
          <div
            key={task.id}
            className="transition-all duration-300 ease-in-out"
          >
            {editingTaskId === task.id ? (
              <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
                <TaskForm
                  className="px-4"
                  focused={true}
                  mode="edit"
                  task={task}
                  onCancel={() => setEditingTaskId(null)}
                  onSave={taskData => {
                    console.log('Updating task:', taskData);
                    setEditingTaskId(null);
                  }}
                />
              </div>
            ) : (
              <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                <TaskDisplay
                  className="px-4"
                  task={task}
                  onEdit={() => setEditingTaskId(task.id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
