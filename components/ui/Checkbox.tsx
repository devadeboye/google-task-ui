import { Check } from 'lucide-react';

interface CheckboxProps {
  id: string;
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
}

export default function Checkbox({
  id,
  checked,
  onChange,
  disabled = false,
}: CheckboxProps) {
  return (
    <div className="relative h-5">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className={`w-5 h-5 appearance-none border-2 border-black rounded-sm peer ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
      />
      {/* Custom checkmark with black background */}
      {checked && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
            <Check size={16} strokeWidth={3} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
}
