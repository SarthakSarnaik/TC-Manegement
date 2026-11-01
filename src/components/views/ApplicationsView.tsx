import React, { useState } from 'react';
import { TCApplication, ApplicationStatus } from '../../types/tc';
import { RecentApplicationsTable } from '../dashboard/RecentApplicationsTable';
import { Plus, Filter, ShieldCheck, CheckCircle2, Clock, XCircle, Award } from 'lucide-react';

interface ApplicationsViewProps {
  applications: TCApplication[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onViewApplication: (app: TCApplication) => void;
  onApproveQuick: (appId: string) => void;
  onViewCertificateQuick: (app: TCApplication) => void;
  onOpenNewApplicationModal: () => void;
}

export const ApplicationsView: React.FC<ApplicationsViewProps> = ({
  applications,
  searchQuery,
  onSearchChange,
  onViewApplication,
  onApproveQuick,
  onViewCertificateQuick,
  onOpenNewApplicationModal,
}) => {
  const pendingCount = applications.filter((a) => a.status === 'Pending').length;
  const reviewCount = applications.filter((a) => a.status === 'Under Review').length;
  const approvedCount = applications.filter((a) => a.status === 'Approved').length;
  const issuedCount = applications.filter((a) => a.status === 'TC Issued').length;
  const rejectedCount = applications.filter((a) => a.status === 'Rejected').length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Pending Desk</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-2">{pendingCount}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Under Review</span>
            <ShieldCheck className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-2">{reviewCount}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Approved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-2">{approvedCount}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">TC Issued</span>
            <Award className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-2">{issuedCount}</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">Rejected</span>
            <XCircle className="w-4 h-4 text-rose-500" />
          </div>
          <p className="text-xl font-bold text-slate-900 mt-2">{rejectedCount}</p>
        </div>
      </div>

      {/* Main Table */}
      <RecentApplicationsTable
        applications={applications}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onViewApplication={onViewApplication}
        onApproveQuick={onApproveQuick}
        onViewCertificateQuick={onViewCertificateQuick}
      />
    </div>
  );
};
