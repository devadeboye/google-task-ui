import Checkbox from '@/components/ui/Checkbox';
import { useTaskListFilterStore } from '../../../lib/stores/taskListFilterStore';

interface ListPanelItemProps {
  id: string;
  title: string;
  count: number;
}

export default function ListPanelItem({
  id,
  title,
  count,
}: ListPanelItemProps) {
  const toggleTaskList = useTaskListFilterStore(state => state.toggleTaskList);
  const isChecked = useTaskListFilterStore(state =>
    state.selectedTaskListIds.has(id)
  );

  const handleToggle = () => {
    toggleTaskList(id);
  };

  return (
    <div className="flex flex-row items-center gap-3 h-8 text-subtle-black justify-center">
      <Checkbox
        id={`tasklist-${id}`}
        checked={isChecked}
        onChange={handleToggle}
      />
      <span className="text-sm font-medium flex-1">{title}</span>
      <span className="text-xs font-medium">{count}</span>
    </div>
  );
}
