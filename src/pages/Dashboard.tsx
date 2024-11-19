import React from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { Dashboard as DashboardContent } from '../components/Dashboard/Dashboard';
import { SideMenuProvider, useSideMenu } from '../context/SideMenuContext';

const DashboardPage: React.FC = () => {
  const { isMobileMenuOpen } = useSideMenu();

  return (
    <>
      <Header />
      <SideMenu activeRoute="/" />
      <main 
        className={`
          pt-16 pb-12
          ml-0
          ${isMobileMenuOpen ? 'blur-sm brightness-50' : ''}
        `}
      >
        <div className="max-w-full overflow-x-hidden">
          <DashboardContent />
        </div>
      </main>
      <Footer className={isMobileMenuOpen ? 'blur-sm brightness-50' : ''} />
    </>
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
