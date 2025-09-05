import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

interface ErrorAlertProps {
  error: Error | null;
  defaultMessage?: string;
  onDismiss?: () => void;
  className?: string;
}

export default function ErrorAlert({
  error,
  defaultMessage = 'An error occurred',
  onDismiss,
  className = '',
}: ErrorAlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (!error || isDismissed) {
    return null;
  }

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  const errorMessage = error.message || defaultMessage;

  return (
    <div
      className={`flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl ${className}`}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      
      <div className="flex-1 min-w-0">
        <p className="text-sm text-red-800 font-medium">Error</p>
        <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
      </div>

      <button
        onClick={handleDismiss}
        className="flex-shrink-0 p-1 text-red-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-100"
        aria-label="Dismiss error"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
