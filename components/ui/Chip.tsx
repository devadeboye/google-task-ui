import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ChipProps {
  children: ReactNode;
  variant?: 'filled' | 'outlined' | 'elevated';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export default function Chip({
  children,
  variant = 'filled',
  size = 'medium',
  disabled = false,
  selected = false,
  onClick,
  onDelete,
  leadingIcon,
  trailingIcon,
  className = '',
  'aria-label': ariaLabel,
}: ChipProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-0';
  
  const variantClasses = {
    filled: selected
      ? 'bg-primary text-on-primary hover:bg-primary/90 focus:bg-primary/80'
      : 'bg-surface-variant text-on-surface-variant hover:bg-surface-variant/80 focus:bg-surface-variant/70',
    outlined: selected
      ? 'bg-primary text-on-primary border-2 border-primary hover:bg-primary/90 focus:bg-primary/80'
      : 'bg-transparent text-on-surface border border-outline hover:bg-surface-variant/8 focus:bg-surface-variant/12',
    elevated: selected
      ? 'bg-primary text-on-primary shadow-sm hover:bg-primary/90 focus:bg-primary/80'
      : 'bg-surface text-on-surface shadow-sm hover:shadow-md focus:shadow-md',
  };
  
  const sizeClasses = {
    small: 'h-6 px-2 text-xs',
    medium: 'h-8 px-3 text-sm',
    large: 'h-10 px-4 text-base',
  };
  
  const disabledClasses = 'opacity-38 cursor-not-allowed hover:bg-transparent hover:shadow-none';
  
  const iconSizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };
  
  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? disabledClasses : ''}
    ${onClick || onDelete ? 'cursor-pointer' : ''}
    ${className}
  `.trim();

  const iconClasses = iconSizeClasses[size];

  return (
    <div
      className={classes}
      onClick={disabled ? undefined : onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : -1}
      aria-label={ariaLabel}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      {leadingIcon && (
        <span className={`${iconClasses} mr-1 flex-shrink-0`}>
          {leadingIcon}
        </span>
      )}
      
      <span className="flex-1 truncate">{children}</span>
      
      {trailingIcon && !onDelete && (
        <span className={`${iconClasses} ml-1 flex-shrink-0`}>
          {trailingIcon}
        </span>
      )}
      
      {onDelete && (
        <button
          className={`${iconClasses} ml-1 flex-shrink-0 rounded-full hover:bg-on-surface/8 focus:bg-on-surface/12 focus:outline-none focus:ring-0`}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          disabled={disabled}
          aria-label="Remove chip"
          type="button"
        >
          {trailingIcon || <X className="w-full h-full" />}
        </button>
      )}
    </div>
  );
}