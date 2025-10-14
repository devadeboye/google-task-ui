import { AlignLeft, Circle } from 'lucide-react';
import { RefObject } from 'react';

interface TaskFormInputsProps {
  titleRef: RefObject<HTMLTextAreaElement | null>;
  formData: { title: string; details: string };
  onInputChange: (field: 'title' | 'details', value: string) => void;
  onTitleFocus: () => void;
  onTitleBlur: () => void;
  onDetailsFocus: () => void;
  onDetailsBlur: () => void;
}

export default function TaskFormInputs({
  titleRef,
  formData,
  onInputChange,
  onTitleFocus,
  onTitleBlur,
  onDetailsFocus,
  onDetailsBlur,
}: TaskFormInputsProps) {
  return (
    <>
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
          onChange={e => onInputChange('title', e.target.value)}
          style={{
            ['fieldSizing' as any]: 'content',
            minHeight: '1.5rem',
            maxHeight: '6rem',
          }}
          onFocus={onTitleFocus}
          onBlur={onTitleBlur}
        />
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
          onChange={e => onInputChange('details', e.target.value)}
          style={{
            ['fieldSizing' as any]: 'content',
            minHeight: '1.5rem',
            maxHeight: '6rem',
          }}
          onFocus={onDetailsFocus}
          onBlur={onDetailsBlur}
        />
      </div>
    </>
  );
}

