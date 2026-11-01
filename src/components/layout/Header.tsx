import React from 'react';
import { Menu, Search, School } from 'lucide-react';
import { NotificationItem } from '../../types/tc';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { ProfileDropdown } from '../common/ProfileDropdown';
import { COLLEGE_CONFIG } from '../../data/mockData';
import { NavTab } from './Sidebar';

interface HeaderProps {
  currentTab: NavTab;
  onOpenMobileSidebar: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onNavigateToSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenMobileSidebar,
  searchQuery,
  onSearchChange,
  notifications,
  onMarkAllNotificationsRead,
  onNavigateToSettings,
}) => {
  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'dashboard':
        return {
          title: 'Administration Dashboard',
          subtitle: 'Overview of Transfer Certificate workflows, statistics, and pending clearances',
        };
      case 'students':
        return {
          title: 'Student Master Records',
          subtitle: 'Search and inspect enrolled student profiles, academic status, and dues clearance',
        };
      case 'applications':
        return {
          title: 'TC Applications Directory',
          subtitle: 'Review, verify dues, approve, or reject student transfer certificate requests',
        };
      case 'certificates':
        return {
          title: 'Official Issued Certificates',
          subtitle: 'Archived institutional Transfer Certificates ready for preview and official printing',
        };
      case 'departments':
        return {
          title: 'Academic Departments',
          subtitle: 'Department-wise student distribution and clearance officers',
        };
      case 'reports':
        return {
          title: 'Reports & Clearance Analytics',
          subtitle: 'Comprehensive analytics, departure reasons, and monthly trends',
        };
      case 'settings':
        return {
          title: 'College System Configurations',
          subtitle: 'Institutional details, TC certificate serial rules, and upcoming MySQL connection parameters',
        };
    }
  };

  const { title, subtitle } = getTabTitle(currentTab);

  return (
    <header className="h-20 bg-white border-b border-slate-200/80 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 md:gap-4 min-w-0">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-base md:text-lg font-bold text-slate-900 truncate">
              {title}
            </h1>
            <span className="hidden xl:inline-flex items-center gap-1 text-[11px] font-medium text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
              <School className="w-3 h-3 text-brand-600" /> {COLLEGE_CONFIG.code}
            </span>
          </div>
          <p className="text-xs text-slate-500 truncate hidden sm:block">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Center/Right: Search bar, Notifications, Profile */}
      <div className="flex items-center gap-3 md:gap-4 shrink-0">
        {/* Search input */}
        <div className="relative hidden md:block w-64 lg:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search roll no, student, app..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
          />
        </div>

        {/* Notifications Dropdown */}
        <NotificationDropdown
          notifications={notifications}
          onMarkAllAsRead={onMarkAllNotificationsRead}
        />

        {/* Vertical divider */}
        <div className="h-6 w-px bg-slate-200 hidden sm:block" />

        {/* Admin Profile */}
        <ProfileDropdown onNavigateToSettings={onNavigateToSettings} />
      </div>
    </header>
  );
};
