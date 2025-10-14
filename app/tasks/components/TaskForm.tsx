import IconButton from '@/components/ui/IconButton';
import {
  AlignLeft,
  CalendarPlus,
  Circle,
  MoreVertical,
  Repeat2,
  Star,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import Chip from '../../../components/ui/Chip';
import { Task } from '../../../lib/types/task.type';

interface TaskFormProps {
  focused: boolean;
  onCancel: () => void;
  task?: Task; // Optional task for edit mode
  mode?: 'create' | 'edit';
  className?: string;
  onSave?: (taskData: {
    title: string;
    details: string;
    dueDate: string | null;
  }) => void;
}

export default function TaskForm({
  focused = false,
  onCancel = () => {},
  task,
  mode = 'create',
  onSave = () => {},
  className = '',
}: TaskFormProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [titleFocused, setTitleFocused] = useState(focused);
  const [detailsFocused, setDetailsFocused] = useState(false);
  const [isDueToday, setIsDueToday] = useState(false);
  const [isDueTomorrow, setIsDueTomorrow] = useState(false);
  const [isDueLater, setIsDueLater] = useState(false);
  const [timeSectionFocused, setTimeSectionFocused] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: task?.title || '',
    details: task?.description || '',
    dueDate: task?.dueDate
      ? new Date(task.dueDate).toISOString().split('T')[0]
      : null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSave(formData);
      setFormData({ title: '', details: '', dueDate: null });
    }
  };

  const handleInputChange = (field: 'title' | 'details', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Date handling functions
  const getToday = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getTomorrow = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleDateSelect = (date: string | null) => {
    setFormData(prev => ({ ...prev, dueDate: date }));

    // Update chip states
    if (date === getToday()) {
      setIsDueToday(true);
      setIsDueTomorrow(false);
      setIsDueLater(false);
    } else if (date === getTomorrow()) {
      setIsDueToday(false);
      setIsDueTomorrow(true);
      setIsDueLater(false);
    } else if (date) {
      setIsDueToday(false);
      setIsDueTomorrow(false);
      setIsDueLater(true);
    } else {
      setIsDueToday(false);
      setIsDueTomorrow(false);
      setIsDueLater(false);
    }

    setShowCalendar(false);
  };

  const clearDueDate = () => {
    setFormData(prev => ({ ...prev, dueDate: null }));
    setIsDueToday(false);
    setIsDueTomorrow(false);
    setIsDueLater(false);
  };

  // Auto-focus title textarea when form appears
  useEffect(() => {
    if (focused && titleRef.current) {
      titleRef.current.focus();
    }
  }, [focused]);

  // Only cancel when both textareas and time section lose focus
  useEffect(() => {
    if (!titleFocused && !detailsFocused && !timeSectionFocused) {
      const timer = setTimeout(() => {
        onCancel();
      }, 200); // Small delay to allow for quick navigation between fields

      return () => clearTimeout(timer);
    }
  }, [titleFocused, detailsFocused, timeSectionFocused, onCancel]);

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 ${focused ? 'bg-focus' : 'hover:bg-focus'} w-full h-fit transition-all duration-300 ease-in-out py-2 ${className}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {/* Title */}
      <div className="flex gap-6">
        <Circle size={20} className="flex-shrink-0" />
        <textarea
          ref={titleRef}
          className="placeholder:text-md text-md placeholder:text-black placeholder:font-light font-normal w-full focus:outline-none resize-none"
          placeholder="Title"
          id="title"
          name="title"
          rows={1}
          value={formData.title}
          onChange={e => handleInputChange('title', e.target.value)}
          style={{
            ['fieldSizing' as any]: 'content',
            minHeight: '1.5rem',
            maxHeight: '6rem',
          }}
          onFocus={() => {
            setTitleFocused(true);
          }}
          onBlur={() => {
            setTitleFocused(false);
          }}
        />

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
      </div>

      {/* Details */}
      <div className="flex gap-2 pl-11">
        <AlignLeft size={18} className="flex-shrink-0" />
        <textarea
          className="placeholder:text-xs text-xs placeholder:text-black placeholder:font-light font-light w-full focus:outline-none resize-none"
          placeholder="Details"
          id="details"
          name="details"
          rows={1}
          value={formData.details}
          onChange={e => handleInputChange('details', e.target.value)}
          style={{
            ['fieldSizing' as any]: 'content',
            minHeight: '1.5rem',
            maxHeight: '6rem',
          }}
          onFocus={() => {
            setDetailsFocused(true);
          }}
          onBlur={() => {
            setDetailsFocused(false);
          }}
        ></textarea>
      </div>

      {/* Time */}
      <div
        className="relative flex gap-2 pl-11 items-center justify-between"
        onMouseDown={() => setTimeSectionFocused(true)}
        onBlur={() => setTimeSectionFocused(false)}
        onFocus={() => setTimeSectionFocused(true)}
      >
        <div className="flex gap-2">
          <Chip
            variant="outlined"
            size="small"
            className={`bg-white border-gray-300 font-normal hover:bg-focus ${isDueToday ? 'bg-gray-300/70! border-gray-300!' : ''}`}
            selected={isDueToday}
            onClick={() => handleDateSelect(getToday())}
            onDelete={isDueToday ? clearDueDate : undefined}
          >
            <span>Today</span>
          </Chip>

          <Chip
            variant="outlined"
            size="small"
            className={`bg-white border-gray-300 font-normal hover:bg-focus ${isDueTomorrow ? 'bg-gray-300/70! border-gray-300!' : ''}`}
            selected={isDueTomorrow}
            onClick={() => handleDateSelect(getTomorrow())}
            onDelete={isDueTomorrow ? clearDueDate : undefined}
          >
            <span>Tomorrow</span>
          </Chip>

          <Chip
            variant="outlined"
            size="small"
            className={`bg-white border-gray-300 font-normal hover:bg-focus ${isDueLater ? 'bg-gray-300/70! border-gray-300!' : ''}`}
            selected={isDueLater}
            onClick={() => setShowCalendar(true)}
            onDelete={isDueLater ? clearDueDate : undefined}
          >
            <CalendarPlus size={18} />
          </Chip>
        </div>

        <IconButton icon={<Repeat2 size={20} color="black" />} size="medium" />
      </div>

      {/* Calendar Modal */}
      {showCalendar && (
        <div
          ref={calendarRef}
          className="absolute top-full left-0 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-4 mt-2"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-900">
              Select Due Date
            </h3>
            <button
              onClick={() => setShowCalendar(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>
          <input
            type="date"
            value={formData.dueDate || ''}
            onChange={e => handleDateSelect(e.target.value || null)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min={getToday()}
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleDateSelect(null)}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              Clear
            </button>
            <button
              onClick={() => setShowCalendar(false)}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
