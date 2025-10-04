import { ButtonHTMLAttributes, ReactNode } from 'react';
import Spinner from './Spinner';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  label: string;
  variant?: 'filled' | 'outlined' | 'text' | 'elevated' | 'tonal';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  textColor?: string;
  fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
  loading?: boolean;
  iconGap?: string;
}

export default function Button({
  label,
  variant = 'filled',
  size = 'medium',
  onClick,
  className = '',
  icon,
  iconPosition = 'left',
  textColor = 'text-primary',
  fontWeight = 'medium',
  loading = false,
  iconGap = 'gap-2',
  ...buttonProps
}: ButtonProps) {
  const baseClasses = `inline-flex items-center justify-center font-${fontWeight} rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:text-gray-700 disabled:font-normal`;

  const variants = {
    filled: 'bg-primary text-white hover:bg-primary/80 shadow-sm',
    outlined: 'border-2 border-primary hover:bg-primary/10',
    text: 'hover:bg-primary/10',
    elevated: 'bg-white text-gray-900 shadow-lg hover:shadow-xl',
    tonal: 'bg-primary/10 hover:bg-primary/20',
  };

  const sizes = {
    small: 'h-8 px-3 text-sm',
    medium: 'h-10 px-6 text-base',
    large: 'h-12 px-8 text-lg',
  };

  // Determine text color - custom color takes precedence, then variant default, then fallback
  const getTextColor = () => {
    if (textColor) return textColor;

    // For variants that don't specify text color, use a default
    if (variant === 'filled') return 'text-white';
    if (variant === 'elevated') return 'text-gray-900';

    return ''; // Let variant handle the color
  };

  const iconClasses = icon ? iconGap : '';
  const flexDirection =
    icon && iconPosition === 'right' ? 'flex-row-reverse' : '';

  const displayIcon = loading ? <Spinner size="sm" /> : icon;

  return (
    <button
      onClick={onClick}
      disabled={loading || buttonProps.disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${iconClasses} ${flexDirection} ${getTextColor()} ${className}`}
      {...buttonProps}
    >
      {displayIcon && iconPosition === 'left' && displayIcon}
      {loading ? 'Loading...' : label}
      {displayIcon && iconPosition === 'right' && displayIcon}
    </button>
  );
}
