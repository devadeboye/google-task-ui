'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ExtendedFabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function ExtendedFab({
  label,
  icon,
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  ...buttonProps
}: ExtendedFabProps) {
  const baseClasses =
    'inline-flex items-center gap-3 rounded-2xl shadow-sm/35 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl active:shadow-md max-w-fit';

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary',
    secondary:
      'bg-surface-container text-on-surface hover:bg-surface-container-highest focus:ring-primary',
    tertiary:
      'bg-surface text-on-surface hover:bg-surface-container focus:ring-primary',
  };

  const sizes = {
    small: 'h-14 px-4 text-sm',
    medium: 'h-20 px-6 text-base',
    large: 'h-24 px-8 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...buttonProps}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}
