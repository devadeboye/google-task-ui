import { Check } from "lucide-react";

interface CheckboxProps {
  id: string;
}

export default function Checkbox({ id }: CheckboxProps) { 
  return (
    <div className="relative h-5">
      <input
        id={id}
        type="checkbox"
        className="w-5 h-5 appearance-none border-2 border-black rounded-sm cursor-pointer peer"
      />
      {/* Custom checkmark with black background */}
      <div className="absolute inset-0 pointer-events-none peer-checked:opacity-100 opacity-0 transition-opacity duration-200">
        <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center">
          <Check size={16} strokeWidth={3} className="text-white" />
        </div>
      </div>
    </div>
  );
}