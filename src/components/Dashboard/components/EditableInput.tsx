import React, { useState, useRef, useEffect } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface EditableInputProps {
  value: string;
  onChange: (value: string) => void;
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
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="group cursor-pointer">
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
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
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
          onKeyDown={handleKeyDown}
          onBlur={(e) => {
            // Only cancel if clicking outside the component entirely
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              handleCancel();
            }
          }}
        />
        <div className="flex items-center gap-1">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="
                  p-1 rounded-full
                  text-primary-600 dark:text-primary-400
                  hover:bg-primary-500/10 dark:hover:bg-primary-400/10
                  transition-colors duration-200
                "
                title="Save (Enter)"
              >
                <CheckIcon className={`w-${iconSize} h-${iconSize}`} />
              </button>
              <button
                onClick={handleCancel}
                className="
                  p-1 rounded-full
                  text-content-text-muted-light dark:text-content-text-muted-dark
                  hover:bg-secondary-200/50 dark:hover:bg-secondary-800/50
                  transition-colors duration-200
                "
                title="Cancel (Esc)"
              >
                <XMarkIcon className={`w-${iconSize} h-${iconSize}`} />
              </button>
            </>
          ) : (
            <PencilIcon 
              className={`
                w-${iconSize} h-${iconSize} 
                text-content-text-muted-light dark:text-content-text-muted-dark 
                opacity-50 group-hover:opacity-100 
                transition-opacity duration-200
              `}
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
