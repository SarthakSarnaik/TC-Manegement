import React, { useState, useRef, useEffect } from 'react';
import { User, ShieldCheck, Database, Settings, LogOut, ChevronDown, CheckCircle } from 'lucide-react';
import { COLLEGE_CONFIG } from '../../data/mockData';

interface ProfileDropdownProps {
  onNavigateToSettings: () => void;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ onNavigateToSettings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white font-bold text-sm flex items-center justify-center shadow-md ring-2 ring-brand-100">
          SS
        </div>
        <div className="text-left hidden md:block">
          <p className="text-xs font-bold text-slate-800 leading-tight">
            {COLLEGE_CONFIG.registrar}
          </p>
          <p className="text-[11px] text-brand-600 font-medium">Registrar / Admin</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> Super Admin
              </span>
              <span className="text-[10px] text-slate-400 font-mono">DBMS v1.0</span>
            </div>
            <p className="text-sm font-bold text-slate-900">{COLLEGE_CONFIG.registrar}</p>
            <p className="text-xs text-slate-500 truncate">{COLLEGE_CONFIG.email}</p>
          </div>

          <div className="py-1">
            <div className="px-4 py-2 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              College Authority
            </div>
            <div className="px-4 py-1.5 text-xs text-slate-700">
              <div className="font-medium text-slate-900">{COLLEGE_CONFIG.name}</div>
              <div className="text-[11px] text-slate-500">College Code: {COLLEGE_CONFIG.code}</div>
            </div>
          </div>

          <div className="border-t border-slate-100 py-1">
            <button
              onClick={() => {
                onNavigateToSettings();
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-600 flex items-center gap-2.5 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" /> System & TC Configurations
            </button>
            <button
              onClick={() => {
                triggerToast("MySQL connection ready to be plugged in backend step!");
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 hover:text-brand-600 flex items-center gap-2.5 transition-colors"
            >
              <Database className="w-4 h-4 text-slate-400" /> Database Status: <span className="text-brand-600 font-semibold">Ready for MySQL</span>
            </button>
          </div>

          <div className="border-t border-slate-100 pt-1">
            <button
              onClick={() => {
                triggerToast("Admin session active. Frontend ready.");
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 transition-colors font-medium"
            >
              <LogOut className="w-4 h-4 text-rose-500" /> End Admin Session
            </button>
          </div>
        </div>
      )}

      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
