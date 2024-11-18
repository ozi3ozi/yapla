import React, { createContext, useContext, useState } from 'react';

interface SideMenuContextType {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const SideMenuContext = createContext<SideMenuContextType | undefined>(undefined);

export const SideMenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SideMenuContext.Provider value={{ isExpanded, setIsExpanded }}>
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
