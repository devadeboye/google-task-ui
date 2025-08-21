'use client';

import { InputHTMLAttributes, useState } from 'react';

interface InputBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onFocus' | 'onBlur'> {
  /** label for the input box */
  label: string;

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
}

export default function InputBox({
  label,
  type = 'text',
  id,
  name,
  placeholder,
  borderColor = 'border-gray-300',
  focusBorderColor = 'focus:border-blue-500',
  focusRingColor = 'focus:ring-blue-500',
  focusLabelColor = 'text-blue-500',
  defaultLabelColor = 'text-gray-500',
  ...inputProps
}: InputBoxProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="relative">
      <input
        {...inputProps}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className={`w-full px-3 py-4 rounded-lg bg-white text-gray-900 placeholder-transparent focus:outline-none transition-all duration-200 ${isActive ? 'border-2' : 'border'} ${borderColor} ${focusBorderColor} ${focusRingColor}`}
        onFocus={() => setIsActive(true)}
        onBlur={() => setIsActive(false)}
      />
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          isActive
            ? `top-0 text-xs bg-white px-1 transform -translate-y-1/2 ${focusLabelColor}`
            : `top-4 text-base ${defaultLabelColor}`
        }`}
      >
        {label}
      </label>
    </div>
  );
}
