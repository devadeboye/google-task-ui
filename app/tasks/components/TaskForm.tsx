import IconButton from '@/components/ui/IconButton';
import { AlignLeft, Circle, MoreVertical, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Task } from '../../../lib/types/task.type';

interface TaskFormProps {
  focused: boolean;
  onCancel: () => void;
  task?: Task; // Optional task for edit mode
  mode?: 'create' | 'edit';
  className?: string;
  onSave?: (taskData: { title: string; details: string }) => void;
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
  const titleRef = useRef<HTMLTextAreaElement>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: task?.title || '',
    details: task?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onSave(formData);
      setFormData({ title: '', details: '' });
    }
  };

  const handleInputChange = (field: 'title' | 'details', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Auto-focus title textarea when form appears
  useEffect(() => {
    if (focused && titleRef.current) {
      titleRef.current.focus();
    }
  }, [focused]);

  // Only cancel when both textareas lose focus
  useEffect(() => {
    if (!titleFocused && !detailsFocused) {
      const timer = setTimeout(() => {
        onCancel();
      }, 200); // Small delay to allow for quick navigation between fields

      return () => clearTimeout(timer);
    }
  }, [titleFocused, detailsFocused, onCancel]);

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
    </form>
  );
}
