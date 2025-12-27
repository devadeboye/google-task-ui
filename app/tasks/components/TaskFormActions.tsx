import IconButton from '@/components/ui/IconButton';
import { MoreVertical, Star } from 'lucide-react';

interface TaskFormActionsProps {
  titleFocused: boolean;
  detailsFocused: boolean;
  isHovered: boolean;
}

export default function TaskFormActions({
  titleFocused,
  detailsFocused,
  isHovered,
}: TaskFormActionsProps) {
  return (
    <div className="relative flex items-end gap-2">
      {(titleFocused || detailsFocused || isHovered) && (
        <div className="absolute right-0 animate-in fade-in-0 zoom-in-95 duration-200 h-6">
          <IconButton icon={<MoreVertical size={18} />} size="small" />
        </div>
      )}
      {isHovered && !titleFocused && !detailsFocused && (
        <div className="absolute right-10 animate-in fade-in-0 zoom-in-95 duration-200 h-6">
          <IconButton icon={<Star size={18} />} size="small" />
        </div>
      )}
    </div>
  );
}

