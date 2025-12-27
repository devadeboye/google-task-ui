import { CalendarPlus } from 'lucide-react';
import { memo, useCallback } from 'react';
import Chip from '../../../components/ui/Chip';

interface TaskFormDateChipsProps {
  isDueToday: boolean;
  isDueTomorrow: boolean;
  isDueLater: boolean;
  dueDate: string | null;
  onSelectToday: () => void;
  onSelectTomorrow: () => void;
  onShowCalendar: () => void;
  onClearDate: () => void;
}

function TaskFormDateChips({
  isDueToday,
  isDueTomorrow,
  isDueLater,
  dueDate,
  onSelectToday,
  onSelectTomorrow,
  onShowCalendar,
  onClearDate,
}: TaskFormDateChipsProps) {
  // Format date for display (e.g., "Fri 17 Oct")
  const formatDateForDisplay = useCallback((dateString: string | null) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });

    return `${dayName} ${day} ${month}`;
  }, []);

  return (
    <div className="flex gap-2">
      <Chip
        variant="outlined"
        size="small"
        className={`bg-white border-gray-300 font-normal hover:bg-focus ${isDueToday ? 'bg-gray-300/70! border-gray-300!' : ''} ${(!isDueToday && isDueTomorrow) || isDueLater ? 'hidden!' : ''}`}
        selected={isDueToday}
        onClick={onSelectToday}
        onDelete={isDueToday ? onClearDate : undefined}
      >
        <span>Today</span>
      </Chip>

      <Chip
        variant="outlined"
        size="small"
        className={`bg-white border-gray-300 font-normal hover:bg-focus ${isDueTomorrow ? 'bg-gray-300/70! border-gray-300!' : ''} ${(!isDueTomorrow && isDueToday) || isDueLater ? 'hidden!' : ''}`}
        selected={isDueTomorrow}
        onClick={onSelectTomorrow}
        onDelete={isDueTomorrow ? onClearDate : undefined}
      >
        <span>Tomorrow</span>
      </Chip>

      <Chip
        variant="outlined"
        size="small"
        className={`bg-white border-gray-300 font-normal hover:bg-focus ${isDueLater ? 'bg-gray-300/70! border-gray-300!' : ''} ${(!isDueLater && isDueToday) || isDueTomorrow ? 'hidden!' : ''}`}
        selected={isDueLater}
        onClick={onShowCalendar}
        onDelete={isDueLater ? onClearDate : undefined}
      >
        {isDueLater && dueDate ? (
          <span className="text-xs">{formatDateForDisplay(dueDate)}</span>
        ) : (
          <CalendarPlus size={18} />
        )}
      </Chip>
    </div>
  );
}

export default memo(TaskFormDateChips);

