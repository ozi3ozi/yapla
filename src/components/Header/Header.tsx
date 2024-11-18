import React from 'react';
import ThemeToggle from '../ThemeToggle';
import {
  UserCircleIcon,
  QuestionMarkCircleIcon,
  BuildingOfficeIcon,
  UserIcon,
  ShieldCheckIcon,
  ArrowRightOnRectangleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline';

interface MenuItem {
  icon: React.ComponentType<any>;
  text: string;
  onClick: () => void;
}

const actions = [
  { icon: QuestionMarkCircleIcon, text: 'Help' },
  { icon: UserCircleIcon, text: 'Profile' },
];

export const Header: React.FC = () => {
  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50
      bg-layout-header-light dark:bg-layout-header-dark
      transition-colors duration-200
      h-16 px-6
      flex items-center justify-between
      shadow-sm
      border-b border-content-border-light dark:border-content-border-dark
    `}>
      <div className="flex items-center gap-4">
        <img 
          src={`${process.env.PUBLIC_URL}/logo.svg`} 
          alt="Yapla" 
          className="h-8 w-auto"
        />
      </div>

      <div className="flex items-center gap-2">
        {actions.map(({ icon: Icon, text }) => (
          <button
            key={text}
            className="
              flex items-center gap-2 px-3 py-2
              rounded-lg
              text-gray-600 dark:text-gray-300
              hover:bg-gray-200/50 dark:hover:bg-gray-700/30
              active:bg-gray-300/50 dark:active:bg-gray-600/30
              transition-colors duration-150
              text-sm font-medium
            "
          >
            <Icon className="h-5 w-5" />
            <span>{text}</span>
          </button>
        ))}

        <div className="h-6 w-px mx-2 bg-gray-300/50 dark:bg-gray-600/50" />
        
        <ThemeToggle />
      </div>
    </header>
  );
};
