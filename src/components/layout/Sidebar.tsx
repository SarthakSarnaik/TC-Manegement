import React from 'react';
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Award,
  Building2,
  BarChart3,
  Settings,
  ChevronRight,
  Shield,
  FilePlus2,
  X
} from 'lucide-react';
import { COLLEGE_CONFIG } from '../../data/mockData';

export type NavTab = 
  | 'dashboard' 
  | 'students' 
  | 'applications' 
  | 'certificates' 
  | 'departments' 
  | 'reports' 
  | 'settings';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  pendingCount: number;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onOpenNewApplicationModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  pendingCount,
  isOpenMobile,
  onCloseMobile,
  onOpenNewApplicationModal,
}) => {
  const navItems = [
    {
      id: 'dashboard' as NavTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'students' as NavTab,
      label: 'Students Directory',
      icon: GraduationCap,
      badge: null,
    },
    {
      id: 'applications' as NavTab,
      label: 'TC Applications',
      icon: FileText,
      badge: pendingCount > 0 ? `${pendingCount}` : null,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'certificates' as NavTab,
      label: 'Issued Certificates',
      icon: Award,
      badge: null,
    },
    {
      id: 'departments' as NavTab,
      label: 'Departments',
      icon: Building2,
      badge: null,
    },
    {
      id: 'reports' as NavTab,
      label: 'Reports & Analytics',
      icon: BarChart3,
      badge: null,
    },
    {
      id: 'settings' as NavTab,
      label: 'System Settings',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100 bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center text-white shadow-inner">
              <Shield className="w-6 h-6 text-brand-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-base tracking-tight text-white">TC Portal</span>
                <span className="text-[10px] font-semibold bg-brand-400/20 text-brand-200 px-1.5 py-0.5 rounded border border-brand-400/30">
                  DBMS
                </span>
              </div>
              <p className="text-[11px] text-brand-200/80 truncate max-w-[155px]">
                {COLLEGE_CONFIG.name}
              </p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1 rounded-lg text-slate-300 hover:text-white lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Button */}
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={() => {
              onOpenNewApplicationModal();
              if (isOpenMobile) onCloseMobile();
            }}
            className="w-full py-2.5 px-4 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-medium text-xs rounded-xl shadow-md shadow-brand-600/20 flex items-center justify-center gap-2 transition-all duration-150 transform hover:-translate-y-0.5"
          >
            <FilePlus2 className="w-4 h-4" />
            <span>New TC Application</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Main Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  if (isOpenMobile) onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 shadow-xs border border-brand-200 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold shadow-xs ${
                        item.badgeColor || 'bg-brand-100 text-brand-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-500" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer College Tag */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="p-3 rounded-xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-brand-700 uppercase tracking-wider">
                System Status
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live Demo
              </span>
            </div>
            <p className="text-[11px] text-slate-600 font-medium">
              Academic Session 2026-27
            </p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Designed for DBMS Lab Evaluation
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
