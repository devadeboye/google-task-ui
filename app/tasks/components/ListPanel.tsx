import CollapsiblePanel from '@/components/ui/CollapsiblePanel';
import Spinner from '@/components/ui/Spinner';
import { useTaskList } from '../../../lib/hooks/use-task-list';
import ListPanelItem from './ListPanelItem';

export default function ListPanel() {
  const { data: taskLists, isLoading, error } = useTaskList();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Spinner size="sm" className="text-gray-500" />
      </div>
    );
  }

  return (
    <div className="">
      <CollapsiblePanel title="Lists" defaultOpen={true}>
        {taskLists?.map(taskList => (
          <ListPanelItem
            key={taskList.id}
            id={taskList.id}
            title={taskList.title}
            count={taskList.tasks.length}
          />
        ))}
      </CollapsiblePanel>
    </div>
  );
}
