import React, { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

interface EditableFieldProps {
  label: string;
  value: string;
  type?: 'text' | 'email';
  placeholder?: string;
  onChange: (value: string) => void;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  type = 'text',
  placeholder,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative group">
      <label className="block text-sm font-medium text-content-text-secondary-light dark:text-content-text-secondary-dark mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          className={`
            w-full px-4 py-2
            bg-white dark:bg-secondary-900/10
            border border-secondary-200 dark:border-primary-800/30
            rounded-lg
            text-content-text-primary-light dark:text-content-text-primary-dark
            placeholder-content-text-muted-light dark:placeholder-content-text-muted-dark
            focus:outline-none focus:ring-2 focus:ring-primary-500/30 dark:focus:ring-primary-400/30
            focus:border-primary-500 dark:focus:border-primary-400
            transition-colors duration-200
            ${!isEditing && 'cursor-default bg-transparent'}
          `}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={!isEditing}
          onBlur={() => setIsEditing(false)}
        />
        <button
          onClick={() => setIsEditing(true)}
          className="
            absolute right-2 top-1/2 -translate-y-1/2
            p-1.5 rounded-full
            text-content-text-muted-light dark:text-content-text-muted-dark
            hover:bg-secondary-100 dark:hover:bg-secondary-900/20
            opacity-0 group-hover:opacity-100
            transition-all duration-200
          "
        >
          <PencilIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
