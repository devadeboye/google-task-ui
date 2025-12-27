'use client';

import { ChevronLeft, ChevronRight, Clock, Repeat, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';
import styles from './CustomCalendar.module.css';

interface CustomCalendarProps {
  showCalendar: boolean;
  selectedDate: Date | null;
  onClose: () => void;
  onDateSelect: (date: Date | null) => void;
  minDate?: Date;
}

export default function CustomCalendar({
  showCalendar,
  selectedDate,
  onClose,
  onDateSelect,
  minDate = new Date(),
}: CustomCalendarProps) {
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

  const handleDayClick = (date: Date | undefined) => {
    if (date) {
      onDateSelect(date);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        ref={calendarRef}
        className="relative bg-white rounded-[28px] shadow-xl p-6 w-[320px] h-fit max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        }}
      >
        <DayPicker
          mode="single"
          selected={selectedDate || undefined}
          onSelect={handleDayClick}
          disabled={{ before: minDate }}
          className={styles.calendar}
          formatters={{
            formatWeekdayName: (date) => date.toLocaleDateString('en-US', { weekday: 'narrow' }),
          }}
          components={{
            Chevron: ({ orientation }) => {
              return orientation === 'left' ? (
                <ChevronLeft size={20} />
              ) : (
                <ChevronRight size={20} />
              );
            },
          }}
        />

        {/* Set time button */}
        <button className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-left">
          <Clock size={20} className="text-gray-600" />
          <span className="text-gray-700 font-normal">Set time</span>
        </button>

        {/* Repeat button */}
        <button className="w-full flex items-center gap-3 px-4 py-3 mt-1 rounded-xl hover:bg-gray-100 transition-colors text-left">
          <Repeat size={20} className="text-gray-600" />
          <span className="text-gray-700 font-normal">Repeat</span>
        </button>

        {/* Action buttons */}
        <div className="flex items-center justify-between mt-6 pt-2">
          <button
            onClick={() => onDateSelect(null)}
            className="p-2 rounded-full hover:bg-blue-50 transition-colors group"
            aria-label="Delete date"
          >
            <Trash2 size={20} className="text-blue-600" />
          </button>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 text-blue-600 font-medium rounded-full hover:bg-blue-50 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors text-sm shadow-sm"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

