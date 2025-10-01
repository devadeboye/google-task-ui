import IconButton from '@/components/ui/IconButton';
import { Circle, MoreVertical, Star } from 'lucide-react';
import { useState } from 'react';

export default function TaskForm() {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-2 ${isFocused ? 'bg-focus' : 'hover:bg-focus'} w-full h-fit transition-all duration-300 ease-in-out px-4 py-2`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div className="flex gap-6">
        <Circle size={20} />
        <textarea
          className="placeholder:text-md text-md placeholder:text-black placeholder:font-light font-normal w-full focus:outline-none resize-none"
          placeholder="Title"
          id="title"
          name="title"
          rows={1}
          style={{
            ['field-sizing' as any]: 'content',
            minHeight: '1.5rem',
            maxHeight: '6rem',
          }}
        />
        <div className="flex items-center gap-2 h-full">
          {(isFocused || isHovered) && (
            <div className="animate-in fade-in-0 zoom-in-95 duration-200">
              <IconButton icon={<MoreVertical size={18} />} />
            </div>
          )}
          {isHovered && !isFocused && (
            <div className="animate-in fade-in-0 zoom-in-95 duration-200">
              <IconButton icon={<Star size={18} />} />
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
            ['field-sizing' as any]: 'content',
            minHeight: '1.5rem',
            maxHeight: '6rem',
          }}
        ></textarea>
      </div>
    </form>
  );
}
