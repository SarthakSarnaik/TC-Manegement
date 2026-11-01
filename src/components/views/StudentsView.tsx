import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  GraduationCap,
  BookOpen,
  DollarSign,
  FlaskConical,
  Building,
  CheckCircle2,
  XCircle,
  FilePlus,
  Mail,
  Phone,
  Calendar,
  Eye,
  User,
} from 'lucide-react';
import { Student } from '../../types/tc';

interface StudentsViewProps {
  students: Student[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onInitiateApplicationForStudent: (student: Student) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({
  students,
  searchQuery,
  onSearchChange,
  onInitiateApplicationForStudent,
}) => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<Student | null>(null);

  const departments = useMemo(() => {
    return ['All', ...Array.from(new Set(students.map((s) => s.department)))];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchDept = selectedDept === 'All' || s.department === selectedDept;
      const matchStatus = selectedStatus === 'All' || s.status === selectedStatus;

      return matchSearch && matchDept && matchStatus;
    });
  }, [students, searchQuery, selectedDept, selectedStatus]);

  const getStatusBadge = (status: Student['status']) => {
    switch (status) {
      case 'Active':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-medium">Active Enrolled</span>;
      case 'TC_Applied':
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full text-xs font-medium">TC In Process</span>;
      case 'TC_Issued':
        return <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded-full text-xs font-medium">TC Issued (Relieved)</span>;
      case 'Alumni':
        return <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-full text-xs font-medium">Alumni</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base md:text-lg font-bold text-slate-900">
            Student Master Database
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional directory containing academic records and department-level dues status
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Department Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
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

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent border-none text-slate-700 font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Enrolled</option>
              <option value="TC_Applied">TC In Process</option>
              <option value="TC_Issued">TC Issued</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Student Profile</th>
                <th className="py-3 px-4">Roll & Reg No</th>
                <th className="py-3 px-4">Department & Degree</th>
                <th className="py-3 px-4">Semester & CGPA</th>
                <th className="py-3 px-4">Dues Clearance Summary</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => {
                const duesClear =
                  s.dues.library &&
                  s.dues.accounts &&
                  s.dues.laboratory &&
                  s.dues.hostel &&
                  s.dues.sports;

                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Student Name */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-700 font-bold flex items-center justify-center border border-brand-100">
                          {s.fullName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{s.fullName}</p>
                          <p className="text-[11px] text-slate-500 truncate max-w-[160px]">
                            {s.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Roll & Reg */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-slate-800">{s.rollNumber}</div>
                      <div className="font-mono text-[10px] text-slate-400">{s.regNumber}</div>
                    </td>

                    {/* Department & Degree */}
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-slate-800">{s.department}</div>
                      <div className="text-[11px] text-slate-500">{s.degree} ({s.batchYear})</div>
                    </td>

                    {/* Semester & CGPA */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">Sem {s.semester}</div>
                      <div className="text-[11px] text-brand-600 font-mono font-medium">
                        CGPA: {s.cgpa}
                      </div>
                    </td>

                    {/* Dues */}
                    <td className="py-3.5 px-4">
                      {duesClear ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> All Dues Cleared
                        </span>
                      ) : (
                        <div className="flex items-center gap-1">
                          <span
                            title={`Library: ${s.dues.library ? 'Cleared' : 'Due'}`}
                            className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                              s.dues.library ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            L
                          </span>
                          <span
                            title={`Accounts: ${s.dues.accounts ? 'Cleared' : 'Due'}`}
                            className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                              s.dues.accounts ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            A
                          </span>
                          <span
                            title={`Labs: ${s.dues.laboratory ? 'Cleared' : 'Due'}`}
                            className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                              s.dues.laboratory ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}
                          >
                            D
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      {getStatusBadge(s.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedStudentForModal(s)}
                          className="p-1.5 text-slate-500 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-200"
                          title="View Student Record"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {s.status === 'Active' && (
                          <button
                            onClick={() => onInitiateApplicationForStudent(s)}
                            className="px-2.5 py-1 text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 flex items-center gap-1 transition-colors"
                            title="Start TC Application"
                          >
                            <FilePlus className="w-3.5 h-3.5" /> Apply TC
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Details Inspection Modal */}
      {selectedStudentForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-gradient-to-r from-brand-900 to-brand-800 text-white flex items-center justify-between">
              <h3 className="font-bold text-base">Student Master Dossier</h3>
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="p-1 rounded-xl text-brand-200 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                <div className="w-12 h-12 rounded-xl bg-brand-600 text-white font-bold text-xl flex items-center justify-center">
                  {selectedStudentForModal.fullName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-900">
                    {selectedStudentForModal.fullName}
                  </h4>
                  <p className="font-mono text-slate-500">
                    {selectedStudentForModal.rollNumber} • {selectedStudentForModal.department}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Admission Date</span>
                  <span className="font-semibold text-slate-800">{selectedStudentForModal.admissionDate}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Date of Birth</span>
                  <span className="font-semibold text-slate-800">{selectedStudentForModal.dob}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Contact Phone</span>
                  <span className="font-semibold text-slate-800">{selectedStudentForModal.phone}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">Guardian / Parent</span>
                  <span className="font-semibold text-slate-800">{selectedStudentForModal.parentName}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase">Residential Address</span>
                <span className="font-medium text-slate-800">{selectedStudentForModal.address}</span>
              </div>
            </div>
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-right">
              <button
                onClick={() => setSelectedStudentForModal(null)}
                className="px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
