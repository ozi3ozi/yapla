import React, { createContext, useContext, useCallback, useReducer, useState, useEffect } from 'react';
import { Banner, BannerType } from '../components/Banner/Banner';
import { nanoid } from 'nanoid';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useSideMenu } from './SideMenuContext';

// Constants
const BANNER_THRESHOLD = 3;

// Types
interface BannerData {
  id: string;
  message: string;
  type: BannerType;
  actionText?: string;
  onAction?: () => void;
}

interface BannerContextType {
  showBanner: (
    message: string,
    type: BannerType,
    actionText?: string,
    onAction?: () => void
  ) => string;
  dismissBanner: (id: string) => void;
}

// Actions
type BannerAction =
  | { type: 'ADD_BANNER'; payload: BannerData }
  | { type: 'REMOVE_BANNER'; payload: { id: string } };

// Reducer
const bannerReducer = (state: BannerData[], action: BannerAction): BannerData[] => {
  switch (action.type) {
    case 'ADD_BANNER':
      return [...state, action.payload];
    case 'REMOVE_BANNER':
      return state.filter(banner => banner.id !== action.payload.id);
    default:
      return state;
  }
};

// Helper Components
const ToggleButton: React.FC<{
  isExpanded: boolean;
  onClick: () => void;
  hiddenCount: number;
}> = ({ isExpanded, onClick, hiddenCount }) => (
  <button
    onClick={onClick}
    className="
      flex items-center justify-center gap-1.5
      px-3 py-1.5 mx-auto
      bg-primary-50 dark:bg-primary-900/10
      hover:bg-primary-100 dark:hover:bg-secondary-900/20
      active:bg-primary-200 dark:active:bg-primary-900/30
      border border-primary-200 dark:border-primary-800/30
      rounded-lg
      text-content-text-primary-light dark:text-content-text-primary-dark
      text-xs font-medium
      transition-colors duration-150
      focus:outline-none focus:ring-2 focus:ring-primary-500/50
    "
    aria-expanded={isExpanded}
  >
    {isExpanded ? (
      <>
        <span>Show less</span>
        <ChevronUpIcon className="h-3 w-3" />
      </>
    ) : (
      <>
        <span>Show {hiddenCount} more</span>
        <ChevronDownIcon className="h-3 w-3" />
      </>
    )}
  </button>
);

// Context
const BannerContext = createContext<BannerContextType | undefined>(undefined);

// Provider Component
export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [banners, dispatch] = useReducer(bannerReducer, []);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isMobileMenuOpen } = useSideMenu();

  // Auto-collapse when banner count exceeds threshold
  useEffect(() => {
    if (banners.length > BANNER_THRESHOLD) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  }, [banners.length]);

  const showBanner = useCallback(
    (message: string, type: BannerType, actionText?: string, onAction?: () => void) => {
      const id = nanoid();
      dispatch({
        type: 'ADD_BANNER',
        payload: { id, message, type, actionText, onAction },
      });
      return id;
    },
    []
  );

  const dismissBanner = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_BANNER', payload: { id } });
  }, []);

  const visibleBanners = isExpanded ? banners : banners.slice(0, BANNER_THRESHOLD);
  const hiddenCount = banners.length - BANNER_THRESHOLD;

  return (
    <BannerContext.Provider value={{ showBanner, dismissBanner }}>
      <div className="flex flex-col min-w-0 w-full">
        {banners.length > 0 && (
          <div className={`
            w-full flex flex-col z-40 pointer-events-none bg-transparent
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'blur-sm brightness-50' : ''}
          `}>
            <div 
              className={`
                flex flex-col space-y-2 relative
                transition-all duration-300 ease-in-out
              `}
            >
              {visibleBanners.map((banner) => (
                <div 
                  key={banner.id} 
                  className="pointer-events-auto transform transition-all duration-200"
                >
                  <Banner
                    id={banner.id}
                    message={banner.message}
                    type={banner.type}
                    actionText={banner.actionText}
                    onAction={banner.onAction}
                    onDismiss={banner.type !== 'critical' ? () => dismissBanner(banner.id) : undefined}
                  />
                </div>
              ))}
              
              {banners.length > BANNER_THRESHOLD && (
                <div className="pointer-events-auto">
                  <ToggleButton
                    isExpanded={isExpanded}
                    onClick={() => setIsExpanded(!isExpanded)}
                    hiddenCount={hiddenCount}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {children}
      </div>
    </BannerContext.Provider>
  );
};

// Hook
export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error('useBanner must be used within a BannerProvider');
  }
  return context;
};
