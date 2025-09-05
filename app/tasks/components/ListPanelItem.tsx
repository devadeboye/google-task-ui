import Checkbox from '@/components/ui/Checkbox';
import { useToggleTaskListActive } from '../../../lib/hooks/use-task-list';
import { TaskList } from '../../../lib/types/task-list.type';

interface ListPanelItemProps {
  list: TaskList;
  count: number;
}

export default function ListPanelItem({ list, count }: ListPanelItemProps) {
  const toggleMutation = useToggleTaskListActive();

  const handleToggle = () => {
    toggleMutation.mutate({
      id: list.id,
      title: list.title,
      isActive: !list.isActive,
    });
  };

  return (
    <div className="flex flex-row items-center gap-3 h-8 text-subtle-black justify-center">
      <Checkbox
        id={`tasklist-${list.id}`}
        checked={list.isActive}
        onChange={handleToggle}
        disabled={toggleMutation.isPending}
      />
      <span className="text-sm font-medium flex-1">{list.title}</span>
      <span className="text-xs font-medium">{count}</span>
    </div>
  );
}
