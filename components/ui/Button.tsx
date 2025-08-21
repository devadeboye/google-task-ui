import { ButtonHTMLAttributes } from 'react';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: string;
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

export default function Button({
  label,
  variant = 'filled',
  size = 'medium',
  onClick,
  className = '',
  ...buttonProps
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    filled: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
    outlined: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    text: 'text-blue-600 hover:bg-blue-50',
    elevated: 'bg-white text-gray-900 shadow-lg hover:shadow-xl',
    tonal: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
  };

  const sizes = {
    small: 'h-8 px-3 text-sm',
    medium: 'h-10 px-6 text-base',
    large: 'h-12 px-8 text-lg',
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...buttonProps}
    >
      {label}
    </button>
  );
}
