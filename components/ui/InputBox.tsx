'use client';

import { InputHTMLAttributes, useState } from 'react';

enum heightEnum {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

interface InputBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onFocus' | 'onBlur'> {
  /** label for the input box */
  label: string;

  /** input box variant */
  variant?: 'outlined' | 'underlined';

  /** input height size - predefined or custom Tailwind class */
  height?: heightEnum | string;

  /** tailwind css class for border color */
  borderColor?: string;

  /** tailwind css class for focus border color */
  focusBorderColor?: string;

  /** tailwind css class for focus ring color */
  focusRingColor?: string;

  /** tailwind css class for focus label color */
  focusLabelColor?: string;

  /** tailwind css class for default label color */
  defaultLabelColor?: string;

  /** tailwind css class for placeholder font size */
  placeholderSize?: string;
}

export default function InputBox({
  label,
  variant = 'outlined',
  height = 'medium',
  type = 'text',
  id,
  name,
  placeholder,
  borderColor = 'border-gray-300',
  focusBorderColor = 'focus:border-blue-500',
  focusRingColor = 'focus:ring-blue-500',
  focusLabelColor = 'text-blue-500',
  defaultLabelColor = 'text-gray-500',
  placeholderSize = 'placeholder:text-sm',
  ...inputProps
}: InputBoxProps) {
  const [isActive, setIsActive] = useState(false);

  // Get height classes
  const getHeightClasses = () => {
    const heightMap = {
      small: 'h-8',
      medium: 'h-12',
      large: 'h-16',
    };

    // If height is a predefined size, use the mapping
    if (height in heightMap) {
      return heightMap[height as keyof typeof heightMap];
    }

    // If height is a custom string, use it directly
    return height;
  };

  // Get variant-specific classes
  const getVariantClasses = () => {
    const heightClass = getHeightClasses();

    if (variant === 'underlined') {
      return {
        input: `w-full px-4 ${heightClass} text-gray-900 placeholder-gray-500 ${placeholderSize} focus:outline-none transition-all duration-200 rounded-md border-0 focus:border-b-3 bg-gray-100 hover:bg-gray-200 flex items-center ${borderColor} ${focusBorderColor}`,
        showLabel: false, // Don't show label for underlined variant
      };
    }

    // Default outlined variant
    return {
      input: `w-full px-3 ${heightClass} rounded-lg bg-white text-gray-900 placeholder-transparent focus:outline-none transition-all duration-200 ${isActive ? 'border-2' : 'border'} ${borderColor} ${focusBorderColor} ${focusRingColor} flex items-center`,
      label: `absolute left-3 transition-all duration-200 pointer-events-none ${
        isActive
          ? `top-0 text-xs bg-white px-1 transform -translate-y-1/2 ${focusLabelColor}`
          : `top-4 text-base ${defaultLabelColor}`
      }`,
      showLabel: true, // Show label for outlined variant
    };
  };

  const variantClasses = getVariantClasses();

  return (
    <div className="relative">
      <input
        {...inputProps}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={variantClasses.input}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      {variantClasses.showLabel && (
        <label htmlFor={id} className={variantClasses.label}>
          {label}
        </label>
      )}
    </div>
  );
}
