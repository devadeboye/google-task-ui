import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface TaskFormCalendarProps {
  showCalendar: boolean;
  dueDate: string | null;
  onClose: () => void;
  onDateSelect: (date: string | null) => void;
  getToday: () => string;
}

export default function TaskFormCalendar({
  showCalendar,
  dueDate,
  onClose,
  onDateSelect,
  getToday,
}: TaskFormCalendarProps) {
  const calendarRef = useRef<HTMLDivElement>(null);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar, onClose]);

  if (!showCalendar) return null;

  return (
    <div
      ref={calendarRef}
      className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-gray-900">Select Due Date</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>
      <input
        type="date"
        value={dueDate || ''}
        onChange={e => onDateSelect(e.target.value || null)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        min={getToday()}
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onDateSelect(null)}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Clear
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Done
        </button>
      </div>
    </div>
  );
}

