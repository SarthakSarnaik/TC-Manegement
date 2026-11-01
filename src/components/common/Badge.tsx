import React from 'react';
import { ApplicationStatus } from '../../types/tc';

interface BadgeProps {
  status: ApplicationStatus | string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<BadgeProps> = ({ status, size = 'sm' }) => {
  const getStyles = (s: string) => {
    switch (s) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-500/20';
      case 'Under Review':
        return 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-500/20';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-500/20';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-500/20';
      case 'TC Issued':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-500/20';
      case 'Active':
        return 'bg-teal-50 text-teal-700 border-teal-200 ring-teal-500/20';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-500/20';
    }
  };

  const getDotColor = (s: string) => {
    switch (s) {
      case 'Pending':
        return 'bg-amber-500';
      case 'Under Review':
        return 'bg-blue-500';
      case 'Approved':
        return 'bg-emerald-500';
      case 'Rejected':
        return 'bg-rose-500';
      case 'TC Issued':
        return 'bg-indigo-500';
      case 'Active':
        return 'bg-teal-500';
      default:
        return 'bg-slate-400';
    }
  };

  const sizeClass = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border shadow-sm ring-1 ring-inset ${getStyles(
        status
      )} ${sizeClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${getDotColor(status)} animate-pulse`} />
      {status}
    </span>
  );
};
