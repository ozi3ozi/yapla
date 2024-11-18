import React from 'react';
import { useSideMenu } from '../../context/SideMenuContext';

interface FooterProps {
  className?: string;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
];

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const [currentLanguage, setCurrentLanguage] = React.useState(languages[0].code);
  const { isExpanded, } = useSideMenu();

  return (
    <footer className={`
      fixed bottom-0 right-0 z-30
      left-0 md:left-6 sm:pl-20
      ${isExpanded ? 'sm:pl-64' : 'sm:pl-20'}
      bg-layout-footer-light dark:bg-layout-footer-dark
      transition-all duration-300 ease-in-out
      h-12 px-6
      flex items-center justify-between
      shadow-[0_-1px_2px_0_rgba(0,0,0,0.05)]
      border-t border-content-border-light dark:border-content-border-dark
      text-sm text-content-text-secondary-light dark:text-content-text-secondary-dark
      ${className}
    `}>
      <div className="flex items-center gap-4">
        <span className='text-primary-600 dark:text-primary-400 font-bold text-xl'>Yapla</span>
        <span className="h-4 w-px bg-gray-300/50 dark:bg-gray-600/50" />
        <span> v6.145.3</span>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
          className="
            px-2 py-1 
            rounded-md
            bg-transparent
            border border-gray-300/30 dark:border-gray-600/30
            hover:border-gray-300/50 dark:hover:border-gray-500/50
            focus:outline-none focus:ring-2 focus:ring-primary-500/30
            text-sm
            transition-colors duration-150
          "
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
    </footer>
  );
};
