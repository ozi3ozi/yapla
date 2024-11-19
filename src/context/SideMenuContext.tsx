import React, { createContext, useContext, useState, useEffect } from 'react';

interface SideMenuContextType {
  isExpanded: boolean;
  setIsExpanded: (value: boolean) => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}

const SideMenuContext = createContext<SideMenuContextType | undefined>(undefined);

export const SideMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) { // sm breakpoint
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle custom event for testing
  useEffect(() => {
    const handleSideMenuEvent = (e: CustomEvent) => {
      setIsExpanded(e.detail);
    };

    document.body.addEventListener('sidemenu-expanded', handleSideMenuEvent as EventListener);
    return () => document.body.removeEventListener('sidemenu-expanded', handleSideMenuEvent as EventListener);
  }, []);

  // Expose state to window for testing
  if (typeof window !== 'undefined') {
    window.sideMenuState = { setIsExpanded };
  }

  return (
    <SideMenuContext.Provider value={{ 
      isExpanded, 
      setIsExpanded,
      isMobileMenuOpen,
      setMobileMenuOpen
    }}>
      {children}
    </SideMenuContext.Provider>
  );
};

export const useSideMenu = () => {
  const context = useContext(SideMenuContext);
  if (context === undefined) {
    throw new Error('useSideMenu must be used within a SideMenuProvider');
  }
  return context;
};

// Add type declaration for window
declare global {
  interface Window {
    sideMenuState: {
      setIsExpanded: (value: boolean) => void;
    };
  }
}
