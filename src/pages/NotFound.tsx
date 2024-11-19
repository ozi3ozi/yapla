import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-transparent flex items-center justify-center px-4 -translate-x-20">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          {/* Error Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-32 h-32 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
              <svg 
                className="w-20 h-20 text-primary-500 dark:text-primary-400" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-primary-500 dark:text-primary-400 mb-4">Page non trouvée</h1>
          <p className="text-text-secondary dark:text-secondary-400 mb-8">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-secondary-900 dark:text-secondary-100 bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
