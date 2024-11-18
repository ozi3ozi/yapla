import React, { useEffect } from 'react';
import { AccountConfig } from './components/AccountConfig';
import { Wallet } from './components/Wallet';
import { QuickActions } from './components/QuickActions';
import { News } from './components/News';
import { useBanner } from '../../context/BannerContext';
import { useSideMenu } from '../../context/SideMenuContext';

// Common component for content sections
const ContentSection: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`
      bg-content-bg-light dark:bg-content-bg-dark
      rounded-xl
      shadow-sm
      border border-content-border-light dark:border-content-border-dark
      transition-colors duration-200
      p-6
      ${className}
    `}
  >
    {children}
  </div>
);

export const Dashboard: React.FC = () => {
  const { showBanner } = useBanner();
  const { isExpanded, isMobileMenuOpen } = useSideMenu();

  useEffect(() => {
    // Show example banners
    showBanner(
      'Authentication of your account requires changes.',
      'critical',
      'Update.',
      () => window.location.href = '/account/settings'
    );

    showBanner(
      'A Maintenance is scheduled between 2024-01-01 and 2024-01-31.',
      'warning',
      'Update',
      () => window.location.href = '/account/settings'
    );

    showBanner(
      'Welcome to the new dashboard! Take a tour to discover new features.',
      'info',
      'Start Tour',
      () => console.log('Starting tour...')
    );
  }, []); // Run once on mount

  return (
    <main className={`
      pb-6 sm:pb-12 mt-4 sm:mt-8 space-y-4 sm:space-y-8
      transition-all duration-300 ease-in-out
      max-w-7xl w-full mx-auto
    `}>
      {/* Banner section will be rendered here by BannerProvider */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        {/* Banners will appear here */}
      </div>

      {/* Main content */}
      <div className={`
        grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8
        w-full px-4 sm:px-6 lg:px-8
        transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'blur-sm brightness-50' : ''}
      `}>
        {/* Account Configuration and Wallet Row */}
        <div className="lg:col-span-7">
          <div className="h-full">
            <AccountConfig />
          </div>
        </div>
        <div className="lg:col-span-5">
          <ContentSection className="h-full">
            <Wallet />
          </ContentSection>
        </div>
        
        {/* Quick Actions Row */}
        <div className="lg:col-span-12">
          <ContentSection className="h-full">
            <QuickActions />
          </ContentSection>
        </div>

        {/* News Row */}
        <div className="lg:col-span-12">
          <ContentSection className="h-full">
            <News />
          </ContentSection>
        </div>
      </div>
    </main>
  );
};
