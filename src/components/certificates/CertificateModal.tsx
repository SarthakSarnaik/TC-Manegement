import React, { useRef } from 'react';
import { X, Printer, ShieldCheck, Download, CheckCircle, Award } from 'lucide-react';
import { IssuedCertificate } from '../../types/tc';
import { COLLEGE_CONFIG } from '../../data/mockData';

interface CertificateModalProps {
  certificate: IssuedCertificate | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  certificate,
  onClose,
}) => {
  const certRef = useRef<HTMLDivElement>(null);

  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  // Convert DOB to formatted words representation
  const formatDOB = (dobStr: string) => {
    try {
      const d = new Date(dobStr);
      return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dobStr;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Controls (Not printed) */}
        <div className="no-print px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-400" />
            <span className="font-bold text-sm">Official Institutional Transfer Certificate</span>
            <span className="text-[11px] bg-brand-500/20 text-brand-300 px-2 py-0.5 rounded font-mono">
              {certificate.certificateNumber}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Body */}
        <div className="p-6 md:p-10 overflow-y-auto bg-slate-100 flex justify-center">
          <div
            ref={certRef}
            className="printable-certificate bg-white w-full max-w-2xl p-8 md:p-12 rounded-2xl shadow-xl border-4 border-double border-slate-800 text-slate-900 relative"
          >
            {/* Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
              <ShieldCheck className="w-96 h-96 text-brand-900" />
            </div>

            {/* Certificate Header */}
            <div className="text-center pb-6 border-b-2 border-slate-900 relative">
              <div className="flex justify-center mb-2">
                <div className="w-14 h-14 rounded-full border-2 border-slate-900 flex items-center justify-center font-bold text-slate-900 text-sm">
                  NITM
                </div>
              </div>
              <h2 className="text-xl md:text-2xl font-serif font-black tracking-wide uppercase text-slate-950">
                {COLLEGE_CONFIG.name}
              </h2>
              <p className="text-[11px] font-sans font-medium text-slate-700 mt-1 max-w-lg mx-auto">
                {COLLEGE_CONFIG.accreditation}
              </p>
              <p className="text-[10px] text-slate-600 mt-0.5 font-sans">
                {COLLEGE_CONFIG.address} | Tel: {COLLEGE_CONFIG.phone}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-300 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="font-sans font-semibold text-slate-600">TC Ref No: </span>
                  <span className="font-bold text-slate-900">{certificate.certificateNumber}</span>
                </div>
                <div>
                  <span className="font-sans font-semibold text-slate-600">Date of Issue: </span>
                  <span className="font-bold text-slate-900">{certificate.dateOfIssue}</span>
                </div>
              </div>
            </div>

            {/* Document Title Banner */}
            <div className="my-6 text-center">
              <span className="inline-block px-6 py-1.5 border-2 border-slate-900 font-serif font-bold text-base md:text-lg tracking-wider uppercase bg-slate-50">
                Transfer & Character Certificate
              </span>
            </div>

            {/* Formal Certificate Text */}
            <div className="space-y-4 text-xs md:text-sm font-serif leading-relaxed text-slate-800">
              <p>
                This is to certify that{' '}
                <strong className="underline underline-offset-4 font-bold text-slate-950 uppercase font-sans">
                  {certificate.studentName}
                </strong>
                , Son/Daughter of{' '}
                <strong className="underline underline-offset-4 font-sans font-bold text-slate-950">
                  {certificate.fatherName}
                </strong>{' '}
                and{' '}
                <strong className="underline underline-offset-4 font-sans font-bold text-slate-950">
                  {certificate.motherName}
                </strong>
                , bearing College Roll Number{' '}
                <span className="font-mono font-bold text-slate-950 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-300">
                  {certificate.studentRollNo}
                </span>
                , was a bonafide student of this Institute in the Department of{' '}
                <strong className="underline underline-offset-4 font-sans text-slate-950">
                  {certificate.department}
                </strong>
                , enrolled in the{' '}
                <strong>{certificate.degree}</strong> program (Academic Session: {certificate.batchYear}).
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dotted border-slate-300 pb-1">
                  <span className="text-slate-600 font-sans text-xs">1. Date of Birth recorded in College Register:</span>
                  <span className="font-bold font-sans text-slate-900">{formatDOB(certificate.dob)}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dotted border-slate-300 pb-1">
                  <span className="text-slate-600 font-sans text-xs">2. Date of Admission into Institute:</span>
                  <span className="font-bold font-sans text-slate-900">{certificate.admissionDate}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dotted border-slate-300 pb-1">
                  <span className="text-slate-600 font-sans text-xs">3. Date of Leaving Institute:</span>
                  <span className="font-bold font-sans text-slate-900">{certificate.dateOfLeaving}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dotted border-slate-300 pb-1">
                  <span className="text-slate-600 font-sans text-xs">4. Institutional Reason for Leaving:</span>
                  <span className="font-bold font-sans text-slate-900">{certificate.reasonForLeaving}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dotted border-slate-300 pb-1">
                  <span className="text-slate-600 font-sans text-xs">5. Settlement of All Institutional Dues & Clearances:</span>
                  <span className="font-bold font-sans text-emerald-800">
                    {certificate.allDuesCleared ? 'FULL CLEARANCE CERTIFIED' : 'PENDING'}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-dotted border-slate-300 pb-1">
                  <span className="text-slate-600 font-sans text-xs">6. General Conduct, Character, and Discipline:</span>
                  <span className="font-bold font-sans text-slate-950 uppercase">{certificate.conduct}</span>
                </div>
              </div>

              <p className="pt-2 text-xs text-slate-600 italic">
                To the best of our institutional knowledge, the student bears a satisfactory moral character and has adhered to all university statutes during their residency.
              </p>
            </div>

            {/* Official Signatures & Seal */}
            <div className="mt-12 pt-6 grid grid-cols-3 gap-4 text-center text-xs font-sans">
              <div>
                <div className="h-10 flex items-end justify-center font-serif italic text-slate-700">
                  {certificate.preparedBy.split(' ')[0]}
                </div>
                <div className="border-t border-slate-800 pt-1 font-bold text-slate-900">
                  Prepared by
                </div>
                <div className="text-[10px] text-slate-500">Clerk / Record Officer</div>
              </div>

              <div className="flex flex-col items-center justify-end">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-400 flex items-center justify-center text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-1">
                  College Seal
                </div>
                <div className="text-[10px] text-slate-500">Official Stamp</div>
              </div>

              <div>
                <div className="h-10 flex items-end justify-center font-serif italic text-slate-700">
                  R. Sen
                </div>
                <div className="border-t border-slate-800 pt-1 font-bold text-slate-900">
                  {COLLEGE_CONFIG.principal}
                </div>
                <div className="text-[10px] text-slate-500">Principal / Head of Institute</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
