import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-background-paper dark:bg-background-dark flex items-center justify-center px-4">
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
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-8xl font-bold text-primary-500 dark:text-primary-400 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-text-primary dark:text-text-inverse mb-2">
            Page non trouvée
          </h2>
          <p className="text-text-secondary dark:text-text-disabled">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        
        <Link
          to="/"
          className="
            inline-flex items-center justify-center
            px-6 py-3
            bg-primary-500 hover:bg-primary-600
            dark:bg-primary-600 dark:hover:bg-primary-700
            text-text-inverse
            rounded-lg
            transition-colors
            duration-200
            font-medium
          "
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
