import React from 'react';
import { AccountConfig } from './components/AccountConfig';
import { Wallet } from './components/Wallet';
import { QuickActions } from './components/QuickActions';
import { News } from './components/News';

export const Dashboard: React.FC = () => {
  return (
    <main className="px-8 pb-12 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Account Configuration and Wallet Row */}
        <div className="md:col-span-7">
          <div className="
            bg-content-bg-light dark:bg-content-bg-dark
            rounded-xl
            shadow-sm
            border border-content-border-light dark:border-content-border-dark
            transition-colors duration-200
            p-6
          ">
            <AccountConfig />
          </div>
        </div>
        <div className="md:col-span-5">
          <div className="
            bg-content-bg-light dark:bg-content-bg-dark
            rounded-xl
            shadow-sm
            border border-content-border-light dark:border-content-border-dark
            transition-colors duration-200
            p-6
          ">
            <Wallet />
          </div>
        </div>
        
        {/* Quick Actions Row */}
        <div className="md:col-span-12">
          <div className="
            bg-content-bg-light dark:bg-content-bg-dark
            rounded-xl
            shadow-sm
            border border-content-border-light dark:border-content-border-dark
            transition-colors duration-200
            p-6
          ">
            <QuickActions />
          </div>
        </div>

        {/* News Row */}
        <div className="md:col-span-12">
          <div className="
            bg-content-bg-light dark:bg-content-bg-dark
            rounded-xl
            shadow-sm
            border border-content-border-light dark:border-content-border-dark
            transition-colors duration-200
            p-6
          ">
            <News />
          </div>
        </div>
      </div>
    </main>
  );
};
