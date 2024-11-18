import React, { useState, useEffect } from 'react';
import { useSideMenu } from '../../context/SideMenuContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isExpanded, isMobileMenuOpen } = useSideMenu();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Background SVG layer */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/${isDark ? 'background-dark.svg' : 'background-light.svg'})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }}
        aria-hidden="true"
      />

      {/* Content layers */}
      <div className={`
        relative flex-1 flex flex-col pt-20 w-full
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'sm:ml-64' : 'sm:ml-20'}
        ${isMobileMenuOpen ? 'ml-0' : 'ml-0'}
      `}>
        {children}
      </div>
    </div>
  );
};
