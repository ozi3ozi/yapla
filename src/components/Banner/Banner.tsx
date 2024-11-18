import React from 'react';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid';

export type BannerType = 'warning' | 'info' | 'critical';

export interface BannerProps {
  id: string;
  message: string;
  type: BannerType;
  actionText?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

interface BannerConfig {
  styles: {
    background: string;
    border: string;
    text: string;
    button: string;
  };
  icon: typeof ExclamationTriangleIcon;
  dismissable: boolean;
}

const bannerConfig: Record<BannerType, BannerConfig> = {
  warning: {
    styles: {
      background: 'bg-amber-50/20 dark:bg-amber-900/10',
      border: 'border border-amber-200 dark:border-amber-500/30',
      text: 'text-amber-800 dark:text-amber-200',
      button: 'bg-amber-100 dark:bg-amber-800 hover:bg-amber-200 dark:hover:bg-amber-700',
    },
    icon: ExclamationTriangleIcon,
    dismissable: true,
  },
  info: {
    styles: {
      background: 'bg-blue-50/20 dark:bg-blue-900/10',
      border: 'border border-blue-200 dark:border-blue-500/30',
      text: 'text-blue-800 dark:text-blue-200',
      button: 'bg-blue-100 dark:bg-blue-800 hover:bg-blue-200 dark:hover:bg-blue-700',
    },
    icon: InformationCircleIcon,
    dismissable: true,
  },
  critical: {
    styles: {
      background: 'bg-red-50/20 dark:bg-red-900/10',
      border: 'border border-red-200 dark:border-red-500/30',
      text: 'text-red-800 dark:text-red-200',
      button: 'bg-red-100 dark:bg-red-800 hover:bg-red-200 dark:hover:bg-red-700',
    },
    icon: ExclamationCircleIcon,
    dismissable: false,
  },
};

export const Banner: React.FC<BannerProps> = ({
  message,
  type,
  actionText,
  onAction,
  onDismiss,
}) => {
  const config = bannerConfig[type];
  const Icon = config.icon;
  const styles = config.styles;

  return (
    <div
      className={`
        w-full flex justify-center
      `}
    >
      <div
        className={`
          w-2/3
          ${styles.background}
          ${styles.border}
          rounded-lg
          shadow-sm
          transition-all duration-200
        `}
        role="alert"
      >
        <div className="py-3 px-4 sm:px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center flex-1 min-w-0">
              <Icon className={`w-5 h-5 ${styles.text} shrink-0`} />
              <p className={`ml-3 text-sm font-medium ${styles.text} truncate`}>
                {message}
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-4">
              {actionText && onAction && (
                <button
                  onClick={onAction}
                  className={`
                    px-4 py-1.5
                    rounded-md
                    text-sm font-medium
                    ${styles.text}
                    ${styles.button}
                    transition-colors duration-200
                  `}
                >
                  {actionText}
                </button>
              )}
              {/* Always render dismiss button space for alignment */}
              <div className="w-7 h-7 flex items-center justify-center">
                {onDismiss && (
                  <button
                    onClick={onDismiss}
                    className={`
                      p-1
                      rounded-md
                      ${styles.text}
                      hover:bg-black/5 dark:hover:bg-white/5
                      transition-colors duration-200
                    `}
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
