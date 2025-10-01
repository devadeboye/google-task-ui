import { ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  variant?: 'filled' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  className?: string;
}

export default function IconButton({
  icon,
  onClick,
  variant = 'text',
  size = 'medium',
  disabled = false,
  className = '',
}: IconButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none';
  
  const variantClasses = {
    filled: 'bg-primary text-on-primary hover:bg-primary/90 focus:bg-primary/80',
    outlined: 'border border-outline text-primary hover:bg-primary/8 focus:bg-primary/12',
    text: 'text-primary hover:bg-primary/8 focus:bg-primary/12',
  };
  
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
  };
  
  const disabledClasses = 'opacity-38 cursor-not-allowed hover:bg-transparent';
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim();

  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label="Icon button"
      tabIndex={-1}
    >
      {icon}
    </button>
  );
}