import React, { useState } from 'react';
import { Sidebar, NavTab } from './Sidebar';
import { Header } from './Header';
import { NotificationItem } from '../../types/tc';

interface LayoutProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  notifications: NotificationItem[];
  onMarkAllNotificationsRead: () => void;
  onOpenNewApplicationModal: () => void;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({
  currentTab,
  onSelectTab,
  pendingCount,
  searchQuery,
  onSearchChange,
  notifications,
  onMarkAllNotificationsRead,
  onOpenNewApplicationModal,
  children,
}) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        pendingCount={pendingCount}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        onOpenNewApplicationModal={onOpenNewApplicationModal}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Header */}
        <Header
          currentTab={currentTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          notifications={notifications}
          onMarkAllNotificationsRead={onMarkAllNotificationsRead}
          onNavigateToSettings={() => onSelectTab('settings')}
        />

        {/* Page Body */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
