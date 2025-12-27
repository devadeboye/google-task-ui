import { ListPlus, MoreVertical } from "lucide-react";
import Button from "../../../components/ui/Button";
import IconButton from "../../../components/ui/IconButton";
import { TaskList } from "../../../lib/types/task-list.type";

interface TaskboardHeaderProps {
  taskList: TaskList;
  setIsAddingTask: (isAddingTask: boolean) => void;
}

export default function TaskboardHeader({ taskList, setIsAddingTask }: TaskboardHeaderProps) { 
  return (
    <>
      <div className="flex flex-row items-center justify-between px-4">
        <h2 className="text-lg">{taskList.title}</h2>
        <IconButton icon={<MoreVertical size={18} />} size="small" />
      </div>

      <div className={`flex items-center gap-6 text-primary px-1.5`}>
        <Button
          label="Add a task"
          variant="text"
          size="small"
          iconGap="gap-6"
          icon={<ListPlus size={18} />}
          className="w-full justify-start rounded-4xl!"
          onClick={() => setIsAddingTask(true)}
        />
      </div>
    </>
  );
}