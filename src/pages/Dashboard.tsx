import React, { useEffect, useState } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { Dashboard as DashboardContent } from '../components/Dashboard/Dashboard';
import { SideMenuProvider, useSideMenu } from '../context/SideMenuContext';

const DashboardPage: React.FC = () => {
  const { isExpanded } = useSideMenu();
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
    <div 
      className="
        min-h-screen bg-background-paper dark:bg-background-dark 
        text-text-primary dark:text-text-inverse 
        transition-all duration-200 
      "
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/assets/${isDark ? 'background-dark.svg' : 'background-light.svg'})`
      }}
    >
      <Header />
      <SideMenu activeRoute="/" />
      <main 
        className={`
          ${isExpanded ? 'ml-64' : 'ml-20'} 
          transition-all duration-200
          pt-16 pb-12
        `}
      >
        <DashboardContent />
      </main>
      <Footer />
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
    <SideMenuProvider>
      <DashboardPage />
    </SideMenuProvider>
  );
};

export default Dashboard;
