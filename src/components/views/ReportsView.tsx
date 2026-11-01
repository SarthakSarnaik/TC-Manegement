import React from 'react';
import { Download, FileSpreadsheet, TrendingUp, CheckCircle, Clock, PieChart as PieChartIcon } from 'lucide-react';
import { TCApplication } from '../../types/tc';

interface ReportsViewProps {
  applications: TCApplication[];
}

export const ReportsView: React.FC<ReportsViewProps> = ({ applications }) => {
  // Export applications to CSV
  const handleExportCSV = () => {
    const headers = [
      'Application No',
      'Student Name',
      'Roll Number',
      'Department',
      'Degree',
      'Batch',
      'Applied Date',
      'Reason For Leaving',
      'Intended Institute',
      'Status',
      'Conduct',
      'Certificate No'
    ];

    const rows = applications.map((a) => [
      `"${a.applicationNo}"`,
      `"${a.studentName}"`,
      `"${a.studentRollNo}"`,
      `"${a.department}"`,
      `"${a.degree}"`,
      `"${a.batchYear}"`,
      `"${a.applicationDate}"`,
      `"${a.reasonForLeaving}"`,
      `"${a.intendedInstitute || 'N/A'}"`,
      `"${a.status}"`,
      `"${a.conduct}"`,
      `"${a.tcCertificateNumber || 'N/A'}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TC_Applications_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reasonCounts: Record<string, number> = {};
  applications.forEach((a) => {
    reasonCounts[a.reasonForLeaving] = (reasonCounts[a.reasonForLeaving] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner with CSV Export */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900">
            Reports & Clearance Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit logs, student departure trends, and official clearance performance metrics
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all self-start sm:self-auto"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export TC Master (CSV)</span>
        </button>
      </div>

      {/* Analytics KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
          <span className="text-xs text-slate-500 font-medium">Avg. Clearance Processing Time</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-slate-900">2.4</span>
            <span className="text-xs text-slate-500 font-medium">days / application</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 40% faster than manual paper TC
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
          <span className="text-xs text-slate-500 font-medium">Nodal Clearance Compliance Rate</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-emerald-600">96.8%</span>
            <span className="text-xs text-slate-500 font-medium">all desks cleared</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Zero pending court / disciplinary holds</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
          <span className="text-xs text-slate-500 font-medium">Digital Verification Authenticity</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-extrabold text-indigo-600">100%</span>
            <span className="text-xs text-slate-500 font-medium">verifiable hashes</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">All issued TCs tamper-proof</p>
        </div>
      </div>

      {/* Breakdown: Reason for Leaving */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
        <div className="flex items-center gap-2 mb-4">
          <PieChartIcon className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-slate-900 text-sm">
            Categorization of Student Departure Reasons
          </h3>
        </div>

        <div className="space-y-3">
          {Object.entries(reasonCounts).map(([reason, count]) => {
            const percentage = Math.round((count / applications.length) * 100);
            return (
              <div key={reason} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{reason}</span>
                  <span className="text-slate-500 font-mono">
                    {count} applications ({percentage}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
