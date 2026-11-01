import React from 'react';
import { Sparkles, FileCheck2, UserCheck, ArrowRight, ShieldCheck } from 'lucide-react';

interface QuickActionBannerProps {
  pendingApprovalsCount: number;
  approvedReadyForIssueCount: number;
  onFilterPending: () => void;
  onFilterApproved: () => void;
  onOpenNewApplication: () => void;
}

export const QuickActionBanner: React.FC<QuickActionBannerProps> = ({
  pendingApprovalsCount,
  approvedReadyForIssueCount,
  onFilterPending,
  onFilterApproved,
  onOpenNewApplication,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-900 via-brand-800 to-navy-900 p-6 text-white shadow-elevation border border-brand-700/50">
      {/* Decorative background glows */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-brand-500/10 blur-3xl pointer-events-none" />
      <div className="absolute left-1/3 -top-12 w-48 h-48 rounded-full bg-brand-400/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-200 text-xs font-semibold mb-3 border border-brand-400/20 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-300" />
            <span>DBMS Academic Session 2026-27</span>
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white tracking-tight">
            Transfer Certificate Administration Desk
          </h2>
          <p className="text-brand-100/90 text-xs md:text-sm mt-1.5 leading-relaxed">
            Verify automated nodal clearance across Central Library, Accounts Section, and Science Labs. Approve verified student requests and generate digitally signed Transfer & Character Certificates.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {pendingApprovalsCount > 0 && (
            <button
              onClick={onFilterPending}
              className="px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-xs"
            >
              <FileCheck2 className="w-4 h-4 text-amber-300" />
              <span>Review {pendingApprovalsCount} Pending</span>
            </button>
          )}

          {approvedReadyForIssueCount > 0 && (
            <button
              onClick={onFilterApproved}
              className="px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-xs font-semibold flex items-center gap-2 transition-all backdrop-blur-xs"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{approvedReadyForIssueCount} Ready for Issue</span>
            </button>
          )}

          <button
            onClick={onOpenNewApplication}
            className="px-4 py-2.5 rounded-xl bg-white text-brand-900 hover:bg-brand-50 text-xs font-bold shadow-md flex items-center gap-2 transition-all"
          >
            <span>Create Application</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
