import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  AlertCircle,
  FileText,
  Building,
  Calendar,
  User,
  GraduationCap,
  ShieldCheck,
  Award,
  AlertTriangle,
  RotateCcw,
  Check,
} from 'lucide-react';
import { TCApplication, DuesStatus } from '../../types/tc';
import { StatusBadge } from '../common/Badge';

interface ApplicationDetailsModalProps {
  application: TCApplication | null;
  onClose: () => void;
  onUpdateStatus: (
    appId: string,
    newStatus: TCApplication['status'],
    updatedDues?: DuesStatus,
    conduct?: TCApplication['conduct'],
    rejectionReason?: string
  ) => void;
  onGenerateCertificate: (app: TCApplication) => void;
}

export const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  application,
  onClose,
  onUpdateStatus,
  onGenerateCertificate,
}) => {
  if (!application) return null;

  const [dues, setDues] = useState<DuesStatus>(application.duesClearance);
  const [conduct, setConduct] = useState<TCApplication['conduct']>(application.conduct);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [showRejectBox, setShowRejectBox] = useState<boolean>(false);

  const toggleDue = (key: keyof DuesStatus) => {
    setDues((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const areAllDuesCleared = dues.library && dues.accounts && dues.laboratory && dues.hostel && dues.sports;

  const handleApprove = () => {
    onUpdateStatus(application.id, 'Approved', dues, conduct);
    onClose();
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert('Please specify a rejection reason for institutional records.');
      return;
    }
    onUpdateStatus(application.id, 'Rejected', dues, conduct, rejectionReason);
    onClose();
  };

  const handleMarkReview = () => {
    onUpdateStatus(application.id, 'Under Review', dues, conduct);
    onClose();
  };

  const handleIssueTC = () => {
    // Generate certificate and open certificate viewer
    onGenerateCertificate(application);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-brand-900 to-brand-800 text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base">TC Application Review</span>
              <span className="text-xs bg-brand-400/20 text-brand-200 px-2 py-0.5 rounded font-mono">
                {application.applicationNo}
              </span>
            </div>
            <p className="text-xs text-brand-200/80 mt-0.5">
              Submitted on {application.applicationDate}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-brand-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Top Status & Student Summary */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-600 text-white font-bold text-lg flex items-center justify-center shadow-md">
                {application.studentName.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  {application.studentName}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-0.5">
                  <span className="font-semibold text-brand-700">Roll: {application.studentRollNo}</span>
                  <span>•</span>
                  <span>{application.degree} ({application.batchYear})</span>
                </div>
              </div>
            </div>
            <div className="sm:text-right">
              <span className="text-[11px] text-slate-400 block mb-1">Current Status</span>
              <StatusBadge status={application.status} size="md" />
            </div>
          </div>

          {/* Department & Leaving Justification */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-slate-400 font-medium block mb-1">Department</span>
              <p className="font-bold text-slate-800 text-sm">{application.department}</p>
            </div>
            <div className="p-3.5 rounded-xl border border-slate-200 bg-white">
              <span className="text-slate-400 font-medium block mb-1">Reason for Leaving</span>
              <p className="font-bold text-slate-800 text-sm">{application.reasonForLeaving}</p>
            </div>
          </div>

          {application.intendedInstitute && (
            <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/80 text-xs">
              <span className="text-blue-700 font-semibold block mb-0.5">
                Intended Institution / Employer:
              </span>
              <p className="text-slate-800 font-medium">{application.intendedInstitute}</p>
            </div>
          )}

          {application.remarks && (
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-500 font-semibold block mb-0.5">
                Application Remarks / Academic Notes:
              </span>
              <p className="text-slate-700">{application.remarks}</p>
            </div>
          )}

          {/* Department Clearance Checklist (Interactive) */}
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-brand-600" />
                  Nodal Clearance Status (Click to toggle for demo)
                </h5>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  All 5 institutional desks must grant clearance before TC can be approved
                </p>
              </div>
              {areAllDuesCleared ? (
                <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                  Ready for Approval
                </span>
              ) : (
                <span className="text-[11px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md">
                  Dues Incomplete
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {[
                { key: 'library' as keyof DuesStatus, label: 'Central Library' },
                { key: 'accounts' as keyof DuesStatus, label: 'Accounts & Finance' },
                { key: 'laboratory' as keyof DuesStatus, label: 'Department Laboratories' },
                { key: 'hostel' as keyof DuesStatus, label: 'Hostel & Mess' },
                { key: 'sports' as keyof DuesStatus, label: 'Sports & Gymnasium' },
              ].map(({ key, label }) => {
                const isCleared = dues[key];
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleDue(key)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isCleared
                        ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                        : 'bg-rose-50/80 border-rose-200 text-rose-800 hover:bg-rose-100'
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isCleared
                          ? 'bg-emerald-600 text-white'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {isCleared ? '✓' : '✗'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conduct & Character Rating */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-white">
            <div>
              <span className="font-semibold text-slate-800 text-xs block">
                Official Character & Conduct Assessment
              </span>
              <span className="text-[11px] text-slate-400">
                This rating is printed on the formal Transfer Certificate
              </span>
            </div>
            <select
              value={conduct}
              onChange={(e) => setConduct(e.target.value as any)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-semibold focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="Exemplary">Exemplary</option>
              <option value="Good">Good</option>
              <option value="Satisfactory">Satisfactory</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          {/* Rejection input box if opened */}
          {showRejectBox && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 animate-in fade-in">
              <label className="block text-xs font-bold text-rose-800 mb-1.5">
                Specify Reason for TC Rejection:
              </label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Unpaid fees in accounts section, missing lab equipment clearance..."
                className="w-full p-2.5 text-xs rounded-xl border border-rose-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                rows={3}
              />
              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRejectBox(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReject}
                  className="px-3 py-1.5 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700 shadow-sm"
                >
                  Confirm Rejection
                </button>
              </div>
            </div>
          )}

          {/* Rejection notice if already rejected */}
          {application.status === 'Rejected' && application.rejectionReason && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs">
              <div className="flex items-center gap-1.5 text-rose-800 font-bold mb-1">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Rejection Reason Recorded:</span>
              </div>
              <p className="text-slate-700">{application.rejectionReason}</p>
            </div>
          )}

          {/* Certificate details if issued */}
          {application.status === 'TC Issued' && (
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-bold text-indigo-900 block">
                  Official Transfer Certificate Issued
                </span>
                <span className="text-indigo-700 font-mono text-[11px]">
                  Certificate No: {application.tcCertificateNumber}
                </span>
                <span className="text-slate-500 text-[10px] block mt-0.5">
                  Issued on: {application.issuedDate}
                </span>
              </div>
              <button
                type="button"
                onClick={handleIssueTC}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <FileText className="w-4 h-4" />
                <span>View & Print Official TC</span>
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Close
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {application.status === 'Pending' && (
              <>
                <button
                  type="button"
                  onClick={handleMarkReview}
                  className="px-3 py-2 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl border border-blue-200 transition-colors"
                >
                  Mark Under Review
                </button>
                <button
                  type="button"
                  onClick={() => setShowRejectBox(true)}
                  className="px-3 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className={`px-4 py-2 text-xs font-semibold rounded-xl text-white shadow-md flex items-center gap-1.5 transition-all ${
                    areAllDuesCleared
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                      : 'bg-emerald-600/70 hover:bg-emerald-600'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Application</span>
                </button>
              </>
            )}

            {application.status === 'Under Review' && (
              <>
                <button
                  type="button"
                  onClick={() => setShowRejectBox(true)}
                  className="px-3 py-2 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Application</span>
                </button>
              </>
            )}

            {application.status === 'Approved' && (
              <button
                type="button"
                onClick={handleIssueTC}
                className="px-5 py-2.5 text-xs font-bold rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-600/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
              >
                <Award className="w-4 h-4" />
                <span>Generate Official Transfer Certificate</span>
              </button>
            )}

            {application.status === 'Rejected' && (
              <button
                type="button"
                onClick={handleMarkReview}
                className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 rounded-xl border border-slate-300 transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Re-open for Review</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
