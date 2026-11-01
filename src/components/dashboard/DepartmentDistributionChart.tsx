import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { DEPARTMENT_DISTRIBUTION_DATA } from '../../data/mockData';
import { Users2 } from 'lucide-react';

export const DepartmentDistributionChart: React.FC = () => {
  const totalStudents = DEPARTMENT_DISTRIBUTION_DATA.reduce(
    (acc, item) => acc + item.value,
    0
  );

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalStudents) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 rounded-xl shadow-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-800">{data.name}</p>
          <p className="text-slate-600 mt-1 flex items-center justify-between gap-3">
            <span>Students:</span>
            <span className="font-semibold text-slate-900">{data.value.toLocaleString()}</span>
          </p>
          <p className="text-brand-600 font-semibold mt-0.5">
            Share: {percentage}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card flex flex-col h-[380px]">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-bold text-slate-900 text-sm md:text-base">
            Department Distribution
          </h3>
          <p className="text-xs text-slate-500">
            Total Enrolled: {totalStudents.toLocaleString()} Students
          </p>
        </div>
        <div className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
          <Users2 className="w-4 h-4" />
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Donut Chart */}
        <div className="w-full md:w-1/2 h-[180px] md:h-full relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={DEPARTMENT_DISTRIBUTION_DATA}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={4}
                dataKey="value"
              >
                {DEPARTMENT_DISTRIBUTION_DATA.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="hover:opacity-80 transition-opacity cursor-pointer outline-none"
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center Label */}
          <div className="absolute text-center pointer-events-none">
            <span className="text-[11px] text-slate-400 font-medium block">Total</span>
            <span className="text-base font-extrabold text-slate-800">
              {totalStudents}
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="w-full md:w-1/2 space-y-2 pr-1 overflow-y-auto max-h-[190px]">
          {DEPARTMENT_DISTRIBUTION_DATA.map((dept) => {
            const percentage = ((dept.value / totalStudents) * 100).toFixed(1);
            return (
              <div
                key={dept.name}
                className="flex items-center justify-between text-xs py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: dept.color }}
                  />
                  <span className="text-slate-700 truncate font-medium">
                    {dept.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] shrink-0">
                  <span className="text-slate-500">{dept.value}</span>
                  <span className="text-slate-400 w-10 text-right">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
