import React from 'react';
import { Link } from 'react-router-dom';

const quickActions = [
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      </svg>
    ),
    text: 'Create Event',
    link: '/events/new'
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    ),
    text: 'Add Member',
    link: '/members/new'
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
      </svg>
    ),
    text: 'Record Payment',
    link: '/payments/new'
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z" />
      </svg>
    ),
    text: 'Create Form',
    link: '/forms/new'
  }
];

export const QuickActions: React.FC = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="
              flex flex-col items-center
              p-4
              bg-white dark:bg-gray-700/50
              hover:bg-gray-50 dark:hover:bg-gray-700
              active:bg-gray-100 dark:active:bg-gray-600
              border border-gray-200/50 dark:border-gray-600/50
              rounded-xl
              transition-colors duration-150
              group
            "
          >
            <div className="
              w-12 h-12
              flex items-center justify-center
              rounded-lg
              bg-primary-100 dark:bg-primary-900/20
              text-primary-600 dark:text-primary-400
              mb-3
              group-hover:bg-primary-200 dark:group-hover:bg-primary-900/30
              transition-colors duration-150
            ">
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {action.text}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
