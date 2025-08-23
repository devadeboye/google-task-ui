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
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    filled: 'bg-primary text-white hover:bg-primary/80 shadow-sm',
    outlined: 'border-2 border-primary text-primary hover:bg-primary/10',
    text: 'text-primary hover:bg-primary/10',
    elevated: 'bg-white text-gray-900 shadow-lg hover:shadow-xl',
    tonal: 'bg-primary/10 text-primary hover:bg-primary/20',
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
