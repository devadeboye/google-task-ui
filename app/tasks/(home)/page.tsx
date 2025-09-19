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
      className={`p-6 ${isOpen ? 'md:columns-1 lg:columns-2' : 'md:columns-2 xl:columns-3'} gap-6`}
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
