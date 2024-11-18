import React, { useState, useRef } from 'react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { EditableInput } from './EditableInput';
import { useToast } from '../../../context/ToastContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const AccountConfig: React.FC = () => {
  const [orgName, setOrgName] = useState('YAPLA');
  const [email, setEmail] = useState('contact@yapla.com');
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  // Organization name handling
  const handleOrgNameChange = (newName: string): boolean => {
    const trimmedName = newName.trim();
    if (trimmedName.length < 2) {
      showToast('Organization name must be at least 2 characters', 'error');
      return false;
    }
    setOrgName(trimmedName);
    showToast('Organization name updated successfully', 'success');
    return true;
  };

  // Email handling
  const handleEmailChange = (newEmail: string): boolean => {
    const trimmedEmail = newEmail.trim();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }
    setEmail(trimmedEmail);
    showToast('Email updated successfully', 'success');
    return true;
  };

  // Logo handling
  const handleLogoClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      showToast('Please upload a valid image file (JPEG, PNG, or GIF)', 'error');
      return;
    }

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      showToast('Image size should be less than 5MB', 'error');
      return;
    }

    showToast('Uploading logo...', 'info');

    try {
      const previewUrl = URL.createObjectURL(file);
      setLogo(previewUrl);
      showToast('Logo updated successfully', 'success');
    } catch (error) {
      showToast('Failed to upload logo. Please try again.', 'error');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
      <div className="flex flex-col items-center sm:items-start sm:flex-row gap-6 sm:gap-8">
        {/* Logo Section */}
        <div
          onClick={handleLogoClick}
          className="
            relative w-24 h-24 sm:w-32 sm:h-32 
            rounded-2xl
            border-2 border-primary-200 dark:border-primary-800/50
            cursor-pointer 
            overflow-hidden 
            group
            transition-all duration-200
            bg-primary-50 dark:bg-primary-900/10
            hover:bg-primary-100 dark:hover:bg-secondary-900/20
            active:bg-primary-200 dark:active:bg-primary-900/30
            hover:shadow-lg
          "
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif"
            className="hidden"
            onChange={handleLogoChange}
          />
          
          {logo ? (
            <>
              <img 
                src={logo}
                alt="Company Logo" 
                className="w-full h-full object-cover"
              />
              <div className="
                absolute inset-0 
                bg-primary-900/60
                flex flex-col items-center justify-center 
                text-white
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
              group-hover:text-primary-500
              transition-colors duration-200
            ">
              <PlusIcon className="w-12 h-12 mb-2" />
              <span className="text-sm font-medium">Add Logo</span>
            </div>
          )}
        </div>
        
        {/* Input Fields */}
        <div className="flex-grow space-y-4 pt-2 w-full text-center sm:text-left">
          <EditableInput
            value={orgName}
            onChange={handleOrgNameChange}
            className="text-2xl font-bold text-gray-900 dark:text-white"
            iconSize={5}
          />

          <EditableInput
            value={email}
            onChange={handleEmailChange}
            type="email"
            className="text-base text-gray-600 dark:text-gray-300"
            iconSize={5}
          />
        </div>
      </div>
    </div>
  );
};
