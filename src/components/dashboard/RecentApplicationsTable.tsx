import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  FileText,
  Clock,
  ArrowUpDown,
  Download,
  AlertCircle,
  Check,
  XCircle,
} from 'lucide-react';
import { TCApplication, ApplicationStatus } from '../../types/tc';
import { StatusBadge } from '../common/Badge';

interface RecentApplicationsTableProps {
  applications: TCApplication[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onViewApplication: (app: TCApplication) => void;
  onApproveQuick: (appId: string) => void;
  onViewCertificateQuick: (app: TCApplication) => void;
}

export const RecentApplicationsTable: React.FC<RecentApplicationsTableProps> = ({
  applications,
  searchQuery,
  onSearchChange,
  onViewApplication,
  onApproveQuick,
  onViewCertificateQuick,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [sortField, setSortField] = useState<'date' | 'name' | 'roll'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const departments = useMemo(() => {
    const set = new Set(applications.map((a) => a.department));
    return ['All', ...Array.from(set)];
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return applications
      .filter((app) => {
        const matchesSearch =
          app.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.studentRollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.applicationNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
          app.department.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          selectedStatus === 'All' || app.status === selectedStatus;

        const matchesDept =
          selectedDept === 'All' || app.department === selectedDept;

        return matchesSearch && matchesStatus && matchesDept;
      })
      .sort((a, b) => {
        if (sortField === 'date') {
          return sortOrder === 'asc'
            ? a.applicationDate.localeCompare(b.applicationDate)
            : b.applicationDate.localeCompare(a.applicationDate);
        }
        if (sortField === 'name') {
          return sortOrder === 'asc'
            ? a.studentName.localeCompare(b.studentName)
            : b.studentName.localeCompare(a.studentName);
        }
        return sortOrder === 'asc'
          ? a.studentRollNo.localeCompare(b.studentRollNo)
          : b.studentRollNo.localeCompare(a.studentRollNo);
      });
  }, [applications, searchQuery, selectedStatus, selectedDept, sortField, sortOrder]);

  const handleSort = (field: 'date' | 'name' | 'roll') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const areAllDuesCleared = (dues: TCApplication['duesClearance']) => {
    return (
      dues.library &&
      dues.accounts &&
      dues.laboratory &&
      dues.hostel &&
      dues.sports
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
      {/* Header and Controls */}
      <div className="p-5 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900 text-base">
              Recent TC Applications
            </h3>
            <span className="text-xs font-semibold bg-brand-50 text-brand-700 px-2.5 py-0.5 rounded-full border border-brand-200">
              {filteredApplications.length} records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor submission status, verify clearance from academic desks, and take administrative action
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent border-none text-slate-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="TC Issued">TC Issued</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Department Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs">
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-transparent border-none text-slate-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d === 'All' ? 'All Departments' : d}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              <th
                onClick={() => handleSort('roll')}
                className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Student & Roll No</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">Department & Degree</th>
              <th
                onClick={() => handleSort('date')}
                className="py-3 px-4 cursor-pointer hover:text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Applied On</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-4">Reason for TC</th>
              <th className="py-3 px-4">Clearance Status</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <AlertCircle className="w-8 h-8 text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-700 text-sm">No applications found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      Try resetting your search query or status filter.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedStatus('All');
                        setSelectedDept('All');
                        onSearchChange('');
                      }}
                      className="mt-3 text-xs text-brand-600 hover:text-brand-700 font-medium underline"
                    >
                      Clear all filters
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              filteredApplications.map((app) => {
                const cleared = areAllDuesCleared(app.duesClearance);
                return (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/70 transition-colors group"
                  >
                    {/* Student & Roll No */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-700 font-bold flex items-center justify-center border border-brand-100 text-xs shrink-0">
                          {app.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
                            {app.studentName}
                          </p>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                            <span>{app.studentRollNo}</span>
                            <span>•</span>
                            <span className="text-slate-400">{app.applicationNo}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Department & Degree */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">
                        {app.department}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {app.degree} ({app.batchYear})
                      </div>
                    </td>

                    {/* Applied Date */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{app.applicationDate}</span>
                      </div>
                    </td>

                    {/* Reason for TC */}
                    <td className="py-3.5 px-4 max-w-[200px]">
                      <div className="font-medium text-slate-800 truncate" title={app.reasonForLeaving}>
                        {app.reasonForLeaving}
                      </div>
                      {app.intendedInstitute && (
                        <div className="text-[10px] text-slate-400 truncate" title={app.intendedInstitute}>
                          {app.intendedInstitute}
                        </div>
                      )}
                    </td>

                    {/* Dues Clearance */}
                    <td className="py-3.5 px-4">
                      {cleared ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <Check className="w-3 h-3 text-emerald-600" /> All Cleared
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <AlertCircle className="w-3 h-3 text-amber-600" /> Dues Pending
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <StatusBadge status={app.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Details */}
                        <button
                          onClick={() => onViewApplication(app)}
                          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-200"
                          title="View Application Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Quick Action: Approve */}
                        {(app.status === 'Pending' || app.status === 'Under Review') && (
                          <button
                            onClick={() => onApproveQuick(app.id)}
                            className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-transparent hover:border-emerald-200"
                            title="Approve Application"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}

                        {/* Quick Action: Certificate */}
                        {app.status === 'TC Issued' && (
                          <button
                            onClick={() => onViewCertificateQuick(app)}
                            className="p-1.5 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors border border-transparent hover:border-indigo-200"
                            title="View Official Certificate"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Summary */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing {filteredApplications.length} of {applications.length} applications
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-400">
            Tip: Click on any row's eye icon to inspect complete multi-department clearances
          </span>
        </div>
      </div>
    </div>
  );
};
