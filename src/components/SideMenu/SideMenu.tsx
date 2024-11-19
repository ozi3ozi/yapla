import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon, UsersIcon, CalendarIcon, CreditCardIcon, Cog6ToothIcon,
  ChevronLeftIcon, ChevronRightIcon, XMarkIcon, Bars3Icon
} from '@heroicons/react/24/outline';
import { useSideMenu } from '../../context/SideMenuContext';

type HeroIcon = typeof HomeIcon;

interface MenuItem {
  icon: HeroIcon;
  text: string;
  path: string;
  id: string;
}

const menuItems: MenuItem[] = [
  { icon: HomeIcon, text: 'Dashboard', path: '/', id: 'dashboard' },
  { icon: UsersIcon, text: 'Members', path: '/members', id: 'members' },
  { icon: CalendarIcon, text: 'Events', path: '/events', id: 'events' },
  { icon: CreditCardIcon, text: 'Donations', path: '/donations', id: 'donations' },
  { icon: Cog6ToothIcon, text: 'Settings', path: '/settings', id: 'settings' },
];

export const SideMenu: React.FC<{ activeRoute: string }> = ({ activeRoute }) => {
  const { isExpanded, setIsExpanded, isMobileMenuOpen, setMobileMenuOpen } = useSideMenu();

  return (
    <>
      <div 
        data-cy="mobile-overlay"
        className={`
          fixed inset-0 z-40
          bg-black/30 
          backdrop-blur-sm
          sm:hidden
          transition-opacity duration-300 ease-in-out
          ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Button */}
      <button
        data-cy="mobile-menu-button"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        className="
          fixed top-3 left-4 z-[60]
          sm:hidden
          p-2
          text-gray-100
          hover:text-white
          focus:outline-none focus:ring-2 focus:ring-primary-500/50
        "
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Side Menu */}
      <nav
        data-cy="side-menu"
        role="navigation"
        aria-label="Main navigation"
        className={`
          fixed top-16 left-0 bottom-0 z-50
          bg-layout-sidemenu-light dark:bg-layout-sidemenu-dark
          transition-all duration-300 ease-in-out
          ${isExpanded || isMobileMenuOpen ? 'w-64' : 'w-20'}
          sm:block
          flex flex-col
          shadow-lg
          border-r border-content-border-light dark:border-content-border-dark
          transform
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          sm:translate-x-0
          backdrop-blur-md bg-opacity-95
        `}
      >
        <div className="flex-1 py-6 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              data-cy={`menu-item menu-item-${item.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className={`
                flex items-center px-4 py-2.5 my-1 mx-3
                rounded-lg
                transition-all duration-200
                group
                ${activeRoute === item.path 
                  ? 'bg-white/10 text-white' 
                  : 'text-gray-100 hover:bg-white/5 hover:text-white'
                }
              `}
              aria-current={activeRoute === item.path ? 'page' : undefined}
            >
              <item.icon 
              data-cy="menu-item-icon"
              className={`
                h-6 w-6 flex-shrink-0
                ${activeRoute === item.path
                  ? 'text-white'
                  : 'text-gray-100 group-hover:text-white'
                }
              `} />
              <span 
                data-cy="menu-item-text"
                className={`
                  ml-3 whitespace-nowrap overflow-hidden text-ellipsis font-medium
                  ${!isExpanded && 'sm:hidden'}
                `}
              >
                {item.text}
              </span>
            </Link>
          ))}
        </div>

        {/* Desktop Toggle Button */}
        <button
          data-cy="toggle-expand"
          onClick={() => setIsExpanded(!isExpanded)}
          className="
            absolute -right-3 top-3
            hidden sm:flex items-center justify-center
            w-6 h-6
            bg-white dark:bg-secondary-900
            text-content-text-primary-light dark:text-content-text-primary-dark
            border border-content-border-light dark:border-content-border-dark
            rounded-full
            shadow-sm
            hover:bg-primary-50 dark:hover:bg-secondary-900/50
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-primary-500/50
          "
          aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
        >
          {isExpanded ? (
            <ChevronLeftIcon className="w-4 h-4" />
          ) : (
            <ChevronRightIcon className="w-4 h-4" />
          )}
        </button>
      </nav>
    </>
  );
};
