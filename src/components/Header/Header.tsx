import React from 'react';
import ThemeToggle from '../ThemeToggle';

export const Header: React.FC = () => {
  return (
    <header 
      data-cy="header"
      className={`
        fixed top-0 left-0 right-0 z-[55]
        bg-layout-header-light dark:bg-layout-header-dark
        transition-colors duration-200
        h-16 px-3
        flex items-center
        shadow-sm
        border-b border-content-border-light dark:border-content-border-dark
        mb-4
      `}
    >
      {/* Empty div for layout balance on mobile */}
      <div data-cy="mobile-spacer" className="w-10 sm:w-0" />

      {/* Logo container */}
      <div 
        data-cy="logo-container"
        className="
          absolute left-1/2 -translate-x-1/2 
          sm:static sm:left-auto sm:transform-none sm:ml-4
          flex items-center
        "
      >
        <img 
          data-cy="header-logo"
          src={`${process.env.PUBLIC_URL}/logo.svg`} 
          alt="Yapla" 
          className="h-8 w-auto"
        />
      </div>

      {/* Theme toggle */}
      <div data-cy="theme-toggle-container" className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
};
