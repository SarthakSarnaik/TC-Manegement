import React, { useState, useMemo } from 'react';
import { Award, Search, Printer, Calendar, FileText, CheckCircle, ShieldCheck } from 'lucide-react';
import { IssuedCertificate } from '../../types/tc';

interface CertificatesViewProps {
  certificates: IssuedCertificate[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectCertificate: (cert: IssuedCertificate) => void;
}

export const CertificatesView: React.FC<CertificatesViewProps> = ({
  certificates,
  searchQuery,
  onSearchChange,
  onSelectCertificate,
}) => {
  const filteredCerts = useMemo(() => {
    return certificates.filter((c) => {
      return (
        c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.studentRollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [certificates, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base md:text-lg font-bold text-slate-900">
              Official Transfer Certificates Registry
            </h2>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-bold border border-indigo-200">
              {filteredCerts.length} Issued
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional ledger of generated certificates with digital verification hashes and print preview
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search cert no, roll, name..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCerts.map((cert) => (
          <div
            key={cert.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-card hover:shadow-elevation transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                  {cert.certificateNumber}
                </span>
              </div>

              <h4 className="font-bold text-slate-900 text-sm group-hover:text-brand-600 transition-colors">
                {cert.studentName}
              </h4>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Roll No: {cert.studentRollNo}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-medium text-slate-800 truncate max-w-[170px]">
                    {cert.department}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Issue Date:</span>
                  <span className="font-semibold text-slate-800">{cert.dateOfIssue}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Conduct:</span>
                  <span className="font-semibold text-emerald-700 uppercase text-[11px]">
                    {cert.conduct}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span className="text-slate-400">Dues Settled:</span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                    <CheckCircle className="w-3 h-3" /> 100% Cleared
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Authorized by Registrar
              </span>
              <button
                onClick={() => onSelectCertificate(cert)}
                className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>View & Print</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
