import React, { useState, useRef, useEffect } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EditableInputProps {
  value: string;
  onChange: (value: string) => boolean; // Return true if validation passes, false otherwise
  type?: 'text' | 'email';
  className?: string;
  iconSize?: number;
}

export const EditableInput: React.FC<EditableInputProps> = ({
  value,
  onChange,
  type = 'text',
  className = '',
  iconSize = 4,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const handleSubmit = () => {
    const success = onChange(inputValue);
    if (success) {
      setIsEditing(false);
    } else {
      setInputValue(value); // Revert to original value if validation fails
    }
  };

  const handleCancel = () => {
    setInputValue(value);
    setIsEditing(false);
  };

  return (
    <div className="group border border-primary-600 md:border-none dark:border-primary-400 rounded-lg px-2">
      <div className={`
        flex items-center gap-3 p-2 -ml-2 rounded-lg
        transition-all duration-200
        ${isEditing 
          ? 'bg-secondary-50 dark:bg-secondary-900/10 ring-2 ring-primary-500/20 dark:ring-primary-400/20' 
          : 'hover:bg-primary-150/10 dark:hover:bg-secondary-900/10'
        }
      `}>
        <input
          ref={inputRef}
          type={type}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              handleCancel();
            }
          }}
          className={`
            bg-transparent
            border-none
            focus:outline-none focus:ring-0
            w-full
            transition-colors duration-200
            ${isEditing ? 'cursor-text' : 'cursor-pointer'}
            ${className}
          `}
          readOnly={!isEditing}
          onClick={() => !isEditing && setIsEditing(true)}
        />
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSubmit}
                className="p-1 rounded-full text-primary-600 dark:text-primary-400 hover:bg-primary-500/10"
              >
                <CheckIcon className={`w-${iconSize} h-${iconSize}`} />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-500/10"
              >
                <XMarkIcon className={`w-${iconSize} h-${iconSize}`} />
              </button>
            </>
          ) : (
            <PencilIcon
              className={`w-${iconSize} h-${iconSize} text-gray-400 group-hover:opacity-100`}
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
