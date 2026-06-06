
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const ErrorNotification: React.FC<ErrorNotificationProps> = ({ message, isVisible, onClose }) => {
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // Auto-hide after 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 animate-fade-in">
      <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 mx-auto max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-red-800">
                Error
              </p>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-red-700 mt-1">
              {message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorNotification;
