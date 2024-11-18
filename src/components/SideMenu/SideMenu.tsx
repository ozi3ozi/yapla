import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  CreditCardIcon,
  Cog6ToothIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useSideMenu } from '../../context/SideMenuContext';

type HeroIcon = typeof HomeIcon;

interface MenuItem {
  icon: HeroIcon;
  text: string;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    icon: HomeIcon,
    text: 'Dashboard',
    path: '/',
  },
  {
    icon: UsersIcon,
    text: 'Members',
    path: '/members',
  },
  {
    icon: CalendarIcon,
    text: 'Events',
    path: '/events',
  },
  {
    icon: CreditCardIcon,
    text: 'Donations',
    path: '/donations',
  },
  {
    icon: Cog6ToothIcon,
    text: 'Settings',
    path: '/settings',
  },
];

interface SideMenuProps {
  activeRoute: string;
}

export const SideMenu: React.FC<SideMenuProps> = ({ activeRoute }) => {
  const { isExpanded, setIsExpanded } = useSideMenu();

  return (
    <nav className={`
      fixed top-16 left-0 bottom-0 z-40
      bg-layout-sidemenu-light dark:bg-layout-sidemenu-dark
      transition-all duration-200
      ${isExpanded ? 'w-64' : 'w-20'}
      flex flex-col
      shadow-[2px_0_4px_0_rgba(0,0,0,0.05)]
      border-r border-content-border-light dark:border-content-border-dark
    `}>
      <div className="flex-1 py-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
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
          >
            <item.icon className={`
              h-6 w-6 flex-shrink-0
              ${activeRoute === item.path
                ? 'text-white'
                : 'text-gray-100 group-hover:text-white'
              }
            `} />
            {isExpanded && (
              <span className="ml-3 whitespace-nowrap overflow-hidden text-ellipsis font-medium">
                {item.text}
              </span>
            )}
          </Link>
        ))}
      </div>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="
          flex items-center justify-center
          h-12 mx-3 mb-6
          rounded-lg
          text-gray-100
          bg-white/5 hover:text-white
          hover:animate-pulse
          active:bg-white/10
          transition-colors duration-200
        "
        aria-label={isExpanded ? 'Collapse menu' : 'Expand menu'}
      >
        {isExpanded 
          ? <ChevronLeftIcon className="h-6 w-6" />
          : <ChevronRightIcon className="h-6 w-6" />
        }
      </button>
    </nav>
  );
};
