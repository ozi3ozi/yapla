import React from 'react';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { BannerProvider } from './context/BannerContext';
import { Layout } from './components/Layout/Layout';
import { SideMenuProvider } from './context/SideMenuContext';

const App: React.FC = () => {
  const location = useLocation();
  const isErrorPage = location.pathname !== '/';

  return (
    <SideMenuProvider>
      <Layout>
        <ToastProvider>
          {!isErrorPage ? (
            <BannerProvider>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BannerProvider>
          ) : (
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          )}
        </ToastProvider>
      </Layout>
    </SideMenuProvider>
  );
};

export default App;
