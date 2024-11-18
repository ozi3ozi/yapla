import React from 'react';

export const Wallet: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-sm font-semibold text-content-text-secondary-light dark:text-content-text-secondary-dark">
          Available Balance
        </h5>
        <button className="
          px-4 py-1.5 
          text-sm font-medium
          bg-primary-500 dark:bg-primary-600
          text-white
          hover:bg-primary-600 dark:hover:bg-primary-700
          active:bg-primary-700 dark:active:bg-primary-800
          rounded-lg
          transition-colors duration-150
        ">
          Withdraw
        </button>
      </div>
      
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-content-text-primary-light dark:text-content-text-primary-dark">
          $24,563.00
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <div className="flex items-center text-success-light dark:text-success-dark">
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 14l5-5 5 5H7z" />
              </svg>
              <span className="font-medium">Income</span>
            </div>
            <p className="text-content-text-primary-light dark:text-content-text-primary-dark font-semibold">
              $32,456.00
            </p>
            <p className="text-content-text-muted-light dark:text-content-text-muted-dark text-sm">
              Last 30 days
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center text-error-light dark:text-error-dark">
              <svg className="w-4 h-4 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 10l5 5 5-5H7z" />
              </svg>
              <span className="font-medium">Expenses</span>
            </div>
            <p className="text-content-text-primary-light dark:text-content-text-primary-dark font-semibold">
              $7,893.00
            </p>
            <p className="text-content-text-muted-light dark:text-content-text-muted-dark text-sm">
              Last 30 days
            </p>
          </div>
        </div>
      </div>

      <div className="pt-6 mt-6 border-t border-content-border-light dark:border-content-border-dark">
        <div className="flex items-center justify-between">
          <span className="text-content-text-secondary-light dark:text-content-text-secondary-dark text-sm">
            Last Transaction
          </span>
          <span className="text-error-light dark:text-error-dark font-semibold text-sm">
            -$156.00
          </span>
        </div>
        <div className="mt-1 text-content-text-muted-light dark:text-content-text-muted-dark text-xs">
          Payment to Supplier XYZ • 2 hours ago
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 pt-6">
        <button className="
          px-4 py-3
          bg-primary-50 dark:bg-primary-900/10
          hover:bg-primary-100 dark:hover:bg-primary-900/20
          active:bg-primary-200 dark:active:bg-primary-900/30
          border border-primary-200 dark:border-primary-800/30
          rounded-lg
          text-content-text-primary-light dark:text-content-text-primary-dark
          text-sm font-medium
          transition-colors duration-150
        ">
          View History
        </button>
        <button className="
          px-4 py-3
          bg-primary-500 dark:bg-primary-600
          hover:bg-primary-600 dark:hover:bg-primary-700
          active:bg-primary-700 dark:active:bg-primary-800
          rounded-lg
          text-white
          text-sm font-medium
          transition-colors duration-150
        ">
          Add Funds
        </button>
      </div>
    </div>
  );
};
