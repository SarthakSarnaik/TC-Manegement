import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCircle2, Clock, AlertCircle, FileCheck, Check } from 'lucide-react';
import { NotificationItem } from '../../types/tc';

interface NotificationDropdownProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onSelectNotification?: (id: string) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'application':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'approval':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'clearance':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      case 'system':
        return <FileCheck className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="View notifications"
        className="relative p-2 text-slate-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-200"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-bounce">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-84 md:w-96 rounded-xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-brand-100 text-brand-700 text-xs px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1 hover:underline"
              >
                <Check className="w-3.5 h-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-sm">
                No notifications right now
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    if (onSelectNotification) onSelectNotification(item.id);
                    setIsOpen(false);
                  }}
                  className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors flex gap-3 ${
                    !item.read ? 'bg-brand-50/40' : ''
                  }`}
                >
                  <div className="mt-0.5 p-2 rounded-lg bg-white shadow-xs border border-slate-100 shrink-0">
                    {getIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <p className="text-xs font-semibold text-slate-900 truncate">
                        {item.title}
                      </p>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-brand-500 self-center shrink-0" />
                  )}
                </div>
              ))
            )}
          </div>

          <div className="px-4 py-2 border-t border-slate-100 text-center">
            <span className="text-xs text-slate-400">All alerts auto-synchronized with College ERP</span>
          </div>
        </div>
      )}
    </div>
  );
};
