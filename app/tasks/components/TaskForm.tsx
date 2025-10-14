import IconButton from '@/components/ui/IconButton';
import { Repeat2 } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Task } from '../../../lib/types/task.type';
import TaskFormActions from './TaskFormActions';
import TaskFormCalendar from './TaskFormCalendar';
import TaskFormDateChips from './TaskFormDateChips';
import TaskFormInputs from './TaskFormInputs';

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

  const handleInputChange = useCallback(
    (field: 'title' | 'details', value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    []
  );

  // Date handling functions
  const getToday = useCallback(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }, []);

  const getTomorrow = useCallback(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  const handleDateSelect = useCallback((date: string | null) => {
    setFormData(prev => ({ ...prev, dueDate: date }));

    // Update chip states
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    if (date === today) {
      setIsDueToday(true);
      setIsDueTomorrow(false);
      setIsDueLater(false);
    } else if (date === tomorrowStr) {
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
  }, []);

  const clearDueDate = useCallback(() => {
    setFormData(prev => ({ ...prev, dueDate: null }));
    setIsDueToday(false);
    setIsDueTomorrow(false);
    setIsDueLater(false);
  }, []);

  // Auto-focus title textarea when form appears
  useEffect(() => {
    if (focused && titleRef.current) {
      titleRef.current.focus();
    }
  }, [focused]);

  // Only cancel when both textareas and time section lose focus
  useEffect(() => {
    if (
      !titleFocused &&
      !detailsFocused &&
      !timeSectionFocused &&
      !showCalendar
    ) {
      const timer = setTimeout(() => {
        onCancel();
      }, 200); // Small delay to allow for quick navigation between fields

      return () => clearTimeout(timer);
    }
  }, [
    titleFocused,
    detailsFocused,
    timeSectionFocused,
    showCalendar,
    onCancel,
  ]);

  const handleCloseCalendar = useCallback(() => {
    setShowCalendar(false);
    setTimeSectionFocused(false);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 ${focused ? 'bg-focus' : 'hover:bg-focus'} w-full h-fit transition-all duration-300 ease-in-out py-2 ${className}`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="flex gap-6">
        <TaskFormInputs
          titleRef={titleRef}
          formData={formData}
          onInputChange={handleInputChange}
          onTitleFocus={() => setTitleFocused(true)}
          onTitleBlur={() => setTitleFocused(false)}
          onDetailsFocus={() => setDetailsFocused(true)}
          onDetailsBlur={() => setDetailsFocused(false)}
        />
        <TaskFormActions
          titleFocused={titleFocused}
          detailsFocused={detailsFocused}
          isHovered={isHovered}
        />
      </div>

      {/* Time */}
      <div className="relative">
        <div
          className="flex gap-2 pl-11 items-center justify-between"
          onMouseDown={() => setTimeSectionFocused(true)}
          onFocus={() => setTimeSectionFocused(true)}
        >
          <TaskFormDateChips
            isDueToday={isDueToday}
            isDueTomorrow={isDueTomorrow}
            isDueLater={isDueLater}
            formData={formData}
            onSelectToday={() => handleDateSelect(getToday())}
            onSelectTomorrow={() => handleDateSelect(getTomorrow())}
            onShowCalendar={() => setShowCalendar(true)}
            onClearDate={clearDueDate}
          />

          <IconButton
            icon={<Repeat2 size={20} color="black" />}
            size="medium"
          />
        </div>

        <TaskFormCalendar
          showCalendar={showCalendar}
          dueDate={formData.dueDate}
          onClose={handleCloseCalendar}
          onDateSelect={handleDateSelect}
          getToday={getToday}
        />
      </div>
    </form>
  );
}
