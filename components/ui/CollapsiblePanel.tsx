'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export default function CollapsiblePanel({
  title,
  children,
  defaultOpen = false,
  className = '',
}: CollapsiblePanelProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className={`${className}`}>
      <button
        onClick={togglePanel}
        className="w-full px-4 py-3 text-left"
        aria-expanded={isOpen}
        aria-controls={`panel-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <div className="flex items-center justify-between">
          <span className="font-medium text-gray-900">{title}</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>
      
      <div
        id={`panel-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4">
          {children}
        </div>
      </div>
    </div>
  );
}
