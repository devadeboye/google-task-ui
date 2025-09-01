import CollapsiblePanel from '@/components/ui/CollapsiblePanel';
import { useTaskList } from '../../../lib/hooks/use-task-list';
import ListPanelItem from './ListPanelItem';

export default function ListPanel() {
  const { data: taskLists, isLoading, error } = useTaskList();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <CollapsiblePanel title="Lists" defaultOpen={true}>
        {taskLists?.map(taskList => (
          <ListPanelItem
            key={taskList.id}
            title={taskList.title}
            count={taskList.tasks.length}
          />
        ))}
      </CollapsiblePanel>
    </div>
  );
}
