import React, { useState, useRef, useEffect } from 'react';
import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

export interface EditableInputProps {
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
    if (!inputValue.trim()) {
      handleCancel();
      return;
    }
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div 
      data-cy="editable-input-wrapper"
      className="group border border-primary-600 md:border-none dark:border-primary-400 rounded-lg px-2"
    >
      <div className={`
        flex items-center gap-3 p-2 -ml-2 rounded-lg
        ${isEditing ? 'bg-white dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'}
        ${className}
      `}>
        <input
          data-cy="editable-input"
          ref={inputRef}
          type={type}
          value={inputValue}
          readOnly={!isEditing}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={() => !isEditing && setIsEditing(true)}
          className={`
            flex-1 p-0 border-none focus:ring-0
            ${isEditing 
              ? 'bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 rounded' 
              : 'bg-transparent cursor-pointer'}
          `}
          aria-label={isEditing ? "Edit value" : "Click to edit value"}
        />
        {isEditing && (
          <div className="flex items-center gap-2">
            <button
              data-cy="editable-input-submit"
              onClick={handleSubmit}
              className="p-1 text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
              aria-label="Submit changes"
            >
              <CheckIcon className={`w-${iconSize} h-${iconSize}`} />
            </button>
            <button
              data-cy="editable-input-cancel"
              onClick={handleCancel}
              className="p-1 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
              aria-label="Cancel changes"
            >
              <XMarkIcon className={`w-${iconSize} h-${iconSize}`} />
            </button>
          </div>
        )}
        {!isEditing && (
          <PencilIcon
            data-cy="editable-input-edit"
            className={`w-${iconSize} h-${iconSize} text-gray-400 group-hover:opacity-100`}
            onClick={() => setIsEditing(true)}
            aria-label="Edit value"
          />
        )}
      </div>
    </div>
  );
};
