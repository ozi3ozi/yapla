import React, { useState } from 'react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { EditableInput } from './EditableInput';

export const AccountConfig: React.FC = () => {
  const [orgName, setOrgName] = useState('YAPLA');
  const [email, setEmail] = useState('contact@yapla.com');
  const [logo, setLogo] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-8">
        <div className="
          relative w-32 h-32 
          rounded-2xl
          bg-primary-50 dark:bg-secondary-900/20
          border-2 border-primary-200 dark:border-primary-800/50
          cursor-pointer 
          overflow-hidden 
          group
          transition-all duration-200
          hover:border-primary-300 dark:hover:border-primary-700/50
          hover:shadow-lg
        ">
          {logo ? (
            <>
              <img 
                src={logo}
                alt="Company Logo" 
                className="w-full h-full object-cover"
              />
              <div className="
                absolute inset-0 
                bg-primary-900/60 dark:bg-primary-900/60
                flex flex-col items-center justify-center 
                text-primary-50
                text-center
                opacity-0 group-hover:opacity-100 
                transition-all duration-200
              ">
                <PencilIcon className="w-8 h-8 mb-2" />
                <span className="text-sm font-medium">Change Logo</span>
              </div>
            </>
          ) : (
            <div className="
              absolute inset-0
              flex flex-col items-center justify-center
              text-primary-400 dark:text-primary-600
              group-hover:text-primary-500 dark:group-hover:text-primary-500
              transition-colors duration-200
            ">
              <PlusIcon className="w-12 h-12 mb-2" />
              <span className="text-sm font-medium">Add Logo</span>
            </div>
          )}
        </div>
        
        <div className="flex-grow space-y-4 pt-2">
          <EditableInput
            value={orgName}
            onChange={setOrgName}
            className="text-2xl font-bold text-content-text-primary-light dark:text-content-text-primary-dark"
            iconSize={5}
          />

          <EditableInput
            value={email}
            onChange={setEmail}
            type="email"
            className="text-base text-content-text-secondary-light dark:text-content-text-secondary-dark"
            iconSize={5}
          />
        </div>
      </div>
    </div>
  );
};
