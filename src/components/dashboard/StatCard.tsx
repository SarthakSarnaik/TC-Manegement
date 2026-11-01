import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  subtitle: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  colorScheme: 'blue' | 'amber' | 'emerald' | 'indigo';
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  colorScheme,
  onClick,
}) => {
  const getSchemeStyles = () => {
    switch (colorScheme) {
      case 'blue':
        return {
          bgIcon: 'bg-brand-50 text-brand-600 border-brand-200 ring-brand-500/10',
          accent: 'hover:border-brand-300',
          tag: 'text-brand-700 bg-brand-50 border-brand-100',
        };
      case 'amber':
        return {
          bgIcon: 'bg-amber-50 text-amber-600 border-amber-200 ring-amber-500/10',
          accent: 'hover:border-amber-300',
          tag: 'text-amber-700 bg-amber-50 border-amber-100',
        };
      case 'emerald':
        return {
          bgIcon: 'bg-emerald-50 text-emerald-600 border-emerald-200 ring-emerald-500/10',
          accent: 'hover:border-emerald-300',
          tag: 'text-emerald-700 bg-emerald-50 border-emerald-100',
        };
      case 'indigo':
        return {
          bgIcon: 'bg-indigo-50 text-indigo-600 border-indigo-200 ring-indigo-500/10',
          accent: 'hover:border-indigo-300',
          tag: 'text-indigo-700 bg-indigo-50 border-indigo-100',
        };
    }
  };

  const styles = getSchemeStyles();

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card hover:shadow-elevation transition-all duration-200 ${
        styles.accent
      } ${onClick ? 'cursor-pointer transform hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            {title}
          </p>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </h3>
        </div>
        <div
          className={`p-3 rounded-xl border ring-4 shadow-xs ${styles.bgIcon}`}
        >
          <Icon className="w-6 h-6" />
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 truncate">{subtitle}</span>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 font-semibold ${
              trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}
          >
            {trend.isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
};
