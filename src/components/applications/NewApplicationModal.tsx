import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle, GraduationCap } from 'lucide-react';
import { Student, TCApplication, ReasonForLeaving } from '../../types/tc';

interface NewApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onSubmit: (app: TCApplication) => void;
}

export const NewApplicationModal: React.FC<NewApplicationModalProps> = ({
  isOpen,
  onClose,
  students,
  onSubmit,
}) => {
  if (!isOpen) return null;

  // Filter students who don't already have an active TC application
  const eligibleStudents = students.filter((s) => s.status === 'Active' || s.status === 'TC_Applied');

  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    eligibleStudents[0]?.id || ''
  );
  const [reason, setReason] = useState<ReasonForLeaving>('Higher Education');
  const [intendedInstitute, setIntendedInstitute] = useState('');
  const [remarks, setRemarks] = useState('');

  const selectedStudent = students.find((s) => s.id === selectedStudentId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const newApp: TCApplication = {
      id: `APP-2026-${String(Math.floor(Math.random() * 900) + 100)}`,
      applicationNo: `TC/APP/2026/0${Math.floor(Math.random() * 90) + 150}`,
      studentId: selectedStudent.id,
      studentRollNo: selectedStudent.rollNumber,
      studentName: selectedStudent.fullName,
      department: selectedStudent.department,
      degree: selectedStudent.degree,
      batchYear: selectedStudent.batchYear,
      applicationDate: new Date().toISOString().split('T')[0],
      reasonForLeaving: reason,
      intendedInstitute: intendedInstitute.trim() || undefined,
      status: 'Pending',
      duesClearance: { ...selectedStudent.dues },
      conduct: 'Good',
      remarks: remarks.trim() || 'New application initiated from Admin portal.',
    };

    onSubmit(newApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-brand-900 to-brand-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-brand-300" />
            <h3 className="font-bold text-base">New TC Application</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-brand-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Select Enrolled Student:
            </label>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
              required
            >
              {eligibleStudents.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.fullName} ({s.rollNumber}) - {s.department}
                </option>
              ))}
            </select>
          </div>

          {selectedStudent && (
            <div className="p-3 bg-brand-50/60 rounded-xl border border-brand-200/80 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">{selectedStudent.fullName}</p>
                <p className="text-[11px] text-slate-500 font-mono">
                  {selectedStudent.rollNumber} • {selectedStudent.degree} • Semester {selectedStudent.semester}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">CGPA</span>
                <span className="font-bold text-brand-700 font-mono text-sm">
                  {selectedStudent.cgpa}
                </span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Reason for Leaving:
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as ReasonForLeaving)}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            >
              <option value="Higher Education">Higher Education (Postgrad / Masters)</option>
              <option value="Job / Employment">Job / Employment Placement</option>
              <option value="Relocation / Family Shift">Relocation / Family Shift</option>
              <option value="Medical Reasons">Medical / Health Reasons</option>
              <option value="Course Completed">Course Completed (Graduation)</option>
              <option value="Personal / Financial">Personal / Financial Difficulties</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Destination Institute / Employer (Optional):
            </label>
            <input
              type="text"
              value={intendedInstitute}
              onChange={(e) => setIntendedInstitute(e.target.value)}
              placeholder="e.g. IIT Bombay, TCS Research, University of Alberta"
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Additional Remarks / Notes:
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={2}
              placeholder="e.g. Student submitted original admission offer letter."
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-600/20 transition-all"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
