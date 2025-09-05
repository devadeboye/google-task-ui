'use client';

import { useMemo } from 'react';
import Spinner from '../../../components/ui/Spinner';
import { useTaskList } from '../../../lib/hooks/use-task-list';
import { useMenuStore } from '../../../lib/stores/menuStore';
import Taskboard from '../components/Taskboard';

export default function TasksPage() {
  const { isOpen } = useMenuStore();
  const { data: taskLists, isLoading, error } = useTaskList();

  // Filter task lists based on server-side isActive status
  const filteredTaskLists = useMemo(() => {
    if (!taskLists) return [];
    return taskLists.filter(taskList => taskList.isActive);
  }, [taskLists]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Spinner size="lg" className="text-gray-600" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error loading task lists</div>;
  }

  return (
    <main
      className={`flex flex-col gap-6 p-6 md:grid ${isOpen ? 'md:grid-cols-1 lg:grid-cols-2' : 'md:grid-cols-2 xl:grid-cols-3'}`}
    >
      {filteredTaskLists.length === 0 ? (
        <div className="text-gray-500 p-6">No active task lists</div>
      ) : (
        filteredTaskLists.map(taskList => (
          <Taskboard key={taskList.id} taskList={taskList} />
        ))
      )}
    </main>
  );
}
