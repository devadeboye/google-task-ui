'use client';

import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  hideDivider?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className = '',
  hideDivider = false,
}: ModalProps) {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className={`relative bg-white shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto ${className}`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 ${!hideDivider ? 'border-b border-gray-200' : ''}`}>
          <h2 className="text-md font-medium text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>
        
        {/* Body */}
        <div className={`${hideDivider ? 'px-6 pt-0 pb-6' : 'p-6'}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
