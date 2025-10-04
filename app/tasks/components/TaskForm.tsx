import IconButton from '@/components/ui/IconButton';
import { Circle, MoreVertical, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface TaskFormProps {
  focused: boolean;
  onCancel: () => void;
}

export default function TaskForm({
  focused = false,
  onCancel = () => {},
}: TaskFormProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [titleFocused, setTitleFocused] = useState(focused);
  const [detailsFocused, setDetailsFocused] = useState(false);
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
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
      className={`flex flex-col gap-2 ${focused ? 'bg-focus' : 'hover:bg-focus'} w-full h-fit transition-all duration-300 ease-in-out px-4 py-2`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="flex gap-6">
        <Circle size={20} className="flex-shrink-0" />
        <textarea
          ref={titleRef}
          className="placeholder:text-md text-md placeholder:text-black placeholder:font-light font-normal w-full focus:outline-none resize-none"
          placeholder="Title"
          id="title"
          name="title"
          rows={1}
          style={{
            fieldSizing: 'content',
            minHeight: '1.5rem',
            maxHeight: '6rem',
          }}
          onFocus={() => {
            // setIsFocused(true);
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

      <div className="flex gap-2 pl-11">
        <textarea
          className="placeholder:text-xs text-xs placeholder:text-black placeholder:font-light font-light w-full focus:outline-none resize-none"
          placeholder="Details"
          id="details"
          name="details"
          rows={1}
          style={{
            fieldSizing: 'content',
            minHeight: '1.5rem',
            maxHeight: '6rem',
          }}
          onFocus={() => {
            // setIsFocused(true);
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
