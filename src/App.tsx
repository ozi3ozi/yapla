import React from 'react';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { BannerProvider } from './context/BannerContext';
import { Layout } from './components/Layout/Layout';
import { SideMenuProvider } from './context/SideMenuContext';

const App: React.FC = () => {
  return (
    <SideMenuProvider>
      <Layout>
        <BannerProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ToastProvider>
        </BannerProvider>
      </Layout>
    </SideMenuProvider>
  );
};

export default App;
