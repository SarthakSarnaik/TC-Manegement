import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, BarChart2, AreaChart as AreaChartIcon } from 'lucide-react';
import { MONTHLY_TREND_DATA } from '../../data/mockData';

export const ApplicationTrendChart: React.FC = () => {
  const [chartType, setChartType] = useState<'area' | 'bar'>('area');

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3.5 rounded-xl shadow-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-800 mb-2 border-b border-slate-100 pb-1">
            {label}
          </p>
          <div className="space-y-1.5">
            <p className="text-brand-600 flex items-center justify-between gap-4 font-medium">
              <span>Applications:</span>
              <span className="font-bold">{payload[0]?.value}</span>
            </p>
            <p className="text-emerald-600 flex items-center justify-between gap-4 font-medium">
              <span>Approved:</span>
              <span className="font-bold">{payload[1]?.value}</span>
            </p>
            <p className="text-indigo-600 flex items-center justify-between gap-4 font-medium">
              <span>Issued TCs:</span>
              <span className="font-bold">{payload[2]?.value}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col h-[380px]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-sm md:text-base">
              Monthly TC Applications & Clearance Trend
            </h3>
            <span className="text-[11px] text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md font-medium border border-brand-100">
              Session 2026
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Correlation between incoming student requests, approvals, and physical certificates issued
          </p>
        </div>

        {/* Chart View Toggle */}
        <div className="flex items-center self-start sm:self-auto bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
          <button
            onClick={() => setChartType('area')}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
              chartType === 'area'
                ? 'bg-white text-brand-700 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Area view"
          >
            <AreaChartIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Area</span>
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-all ${
              chartType === 'bar'
                ? 'bg-white text-brand-700 shadow-xs font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
            title="Bar view"
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Bar</span>
          </button>
        </div>
      </div>

      <div className="flex-1 w-full min-h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={MONTHLY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorApplied" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0270c7" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#0270c7" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorApproved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIssued" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
              />
              <Area
                type="monotone"
                dataKey="applications"
                name="Applications"
                stroke="#0270c7"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorApplied)"
              />
              <Area
                type="monotone"
                dataKey="approved"
                name="Approved"
                stroke="#10b981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorApproved)"
              />
              <Area
                type="monotone"
                dataKey="issued"
                name="Issued"
                stroke="#6366f1"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorIssued)"
              />
            </AreaChart>
          ) : (
            <BarChart data={MONTHLY_TREND_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: '11px', paddingBottom: '10px' }}
              />
              <Bar dataKey="applications" name="Applications" fill="#0270c7" radius={[4, 4, 0, 0]} />
              <Bar dataKey="approved" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="issued" name="Issued" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
