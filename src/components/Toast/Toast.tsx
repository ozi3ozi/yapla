import React, { useEffect } from 'react';
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  onClose: (id: string) => void;
  duration?: number;
}

const toastStyles = {
  success: {
    bg: 'bg-[#F0FDF4] dark:bg-[#166534]/20',
    border: 'border-[#86EFAC]/50 dark:border-[#22C55E]/30',
    text: 'text-[#16A34A] dark:text-[#86EFAC]',
    icon: ({ className }: { className?: string }) => (
      <CheckCircleIcon className={className} />
    ),
  },
  error: {
    bg: 'bg-[#FEF2F2] dark:bg-[#991B1B]/20',
    border: 'border-[#FCA5A5]/50 dark:border-[#EF4444]/30',
    text: 'text-[#DC2626] dark:text-[#FCA5A5]',
    icon: ({ className }: { className?: string }) => (
      <ExclamationCircleIcon className={className} />
    ),
  },
  info: {
    bg: 'bg-[#EFF6FF] dark:bg-[#1E40AF]/20',
    border: 'border-[#93C5FD]/50 dark:border-[#3B82F6]/30',
    text: 'text-[#2563EB] dark:text-[#93C5FD]',
    icon: ({ className }: { className?: string }) => (
      <InformationCircleIcon className={className} />
    ),
  },
};

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  const styles = toastStyles[type];
  const Icon = styles.icon;

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <div
      className={`
        flex items-center gap-3
        px-4 py-3
        rounded-lg
        ${styles.bg}
        border ${styles.border}
        shadow-sm
        backdrop-blur-sm
        animate-slide-in-right
      `}
      role="alert"
    >
      <Icon className={`w-5 h-5 ${styles.text} shrink-0`} />
      <p className={`flex-1 text-sm font-medium ${styles.text}`}>{message}</p>
      <button
        onClick={() => onClose(id)}
        className={`
          p-1
          rounded-md
          ${styles.text}
          hover:bg-black/5 dark:hover:bg-white/5
          transition-colors duration-200
          shrink-0
        `}
        aria-label="Close notification"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  );
};
