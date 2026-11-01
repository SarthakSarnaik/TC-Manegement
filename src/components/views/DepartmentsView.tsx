import React from 'react';
import { Building2, Users, Mail, Clock, Award, ShieldAlert, Cpu, Binary, Radio, Cog, HardHat, Zap } from 'lucide-react';
import { DEPARTMENTS_DATA } from '../../data/mockData';

export const DepartmentsView: React.FC = () => {
  const getIcon = (code: string) => {
    switch (code) {
      case 'CSE':
        return <Binary className="w-5 h-5 text-brand-600" />;
      case 'IT':
        return <Cpu className="w-5 h-5 text-blue-600" />;
      case 'ECE':
        return <Radio className="w-5 h-5 text-emerald-600" />;
      case 'ME':
        return <Cog className="w-5 h-5 text-amber-600" />;
      case 'CE':
        return <HardHat className="w-5 h-5 text-purple-600" />;
      case 'EEE':
        return <Zap className="w-5 h-5 text-rose-600" />;
      default:
        return <Building2 className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
        <h2 className="text-base md:text-lg font-bold text-slate-900">
          Academic Departments & Nodal Desks
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Departmental enrollment metrics and clearance coordination desks
        </p>
      </div>

      {/* Grid of Departments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {DEPARTMENTS_DATA.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card hover:shadow-elevation transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  {getIcon(dept.code)}
                </div>
                <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                  {dept.code}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm">
                {dept.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Head of Dept: <span className="font-semibold text-slate-700">{dept.hodName}</span>
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Users className="w-3.5 h-3.5" /> Enrolled Students:
                  </span>
                  <span className="font-bold text-slate-900 font-mono">
                    {dept.totalStudents}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-amber-500" /> Pending TC Clearances:
                  </span>
                  <span className="font-bold text-amber-600 font-mono">
                    {dept.pendingTCs}
                  </span>
                </div>

                <div className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <Award className="w-3.5 h-3.5 text-indigo-500" /> Issued Certificates:
                  </span>
                  <span className="font-bold text-indigo-600 font-mono">
                    {dept.issuedTCs}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Clearance Desk</span>
              <a
                href={`mailto:${dept.hodEmail}`}
                className="text-brand-600 font-medium hover:underline flex items-center gap-1"
              >
                <Mail className="w-3 h-3" /> Contact HOD
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
