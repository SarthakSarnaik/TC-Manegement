import React, { useState } from 'react';
import { Settings, School, Shield, Database, Save, CheckCircle2, Server } from 'lucide-react';
import { COLLEGE_CONFIG } from '../../data/mockData';

export const SettingsView: React.FC = () => {
  const [config, setConfig] = useState(COLLEGE_CONFIG);
  const [tcPrefix, setTcPrefix] = useState('NITM/TC/2026/');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-card">
        <h2 className="text-base md:text-lg font-bold text-slate-900">
          College System & DBMS Configurations
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage institutional parameters, certificate serial numbers, and upcoming MySQL database linkage
        </p>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>System configuration parameters saved locally in current session!</span>
        </div>
      )}

      {/* College Configuration Form */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-card space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <School className="w-4 h-4 text-brand-600" />
          <h3 className="font-bold text-slate-900 text-sm">
            Institution Details & Certificate Signatories
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Institution Name:
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => setConfig({ ...config, name: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              College Code:
            </label>
            <input
              type="text"
              value={config.code}
              onChange={(e) => setConfig({ ...config, code: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Principal / Head of Institution:
            </label>
            <input
              type="text"
              value={config.principal}
              onChange={(e) => setConfig({ ...config, principal: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Registrar / Clearance Officer:
            </label>
            <input
              type="text"
              value={config.registrar}
              onChange={(e) => setConfig({ ...config, registrar: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-slate-700 font-semibold mb-1">
              University Affiliation & Accreditation:
            </label>
            <input
              type="text"
              value={config.accreditation}
              onChange={(e) => setConfig({ ...config, accreditation: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Transfer Certificate Prefix:
            </label>
            <input
              type="text"
              value={tcPrefix}
              onChange={(e) => setTcPrefix(e.target.value)}
              className="w-full p-2.5 font-mono bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Resulting TC format: {tcPrefix}0089
            </span>
          </div>
        </div>

        <div className="pt-3 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md shadow-brand-600/20 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Institutional Parameters</span>
          </button>
        </div>
      </form>

      {/* Upcoming DBMS & MySQL Integration Preview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-card space-y-4 text-xs">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <Database className="w-4 h-4 text-indigo-600" />
          <h3 className="font-bold text-slate-900 text-sm">
            DBMS Subject Project - MySQL Relational Schema Plan
          </h3>
          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 px-2 py-0.5 rounded text-[11px] font-mono font-semibold ml-auto">
            Phase 2 Ready
          </span>
        </div>

        <p className="text-slate-600 leading-relaxed">
          The frontend state is modeled after standard Third Normal Form (3NF) relational database schemas. When we connect MySQL, the following tables will be directly mapped:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-brand-700 font-bold block mb-1">TABLE: students</span>
            <p className="text-slate-500 font-sans text-xs">
              Primary Key: <code className="text-brand-600">roll_number</code>, Foreign Key to <code className="text-slate-700">departments</code>. Stores CGPA, batch, guardian contact.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-brand-700 font-bold block mb-1">TABLE: tc_applications</span>
            <p className="text-slate-500 font-sans text-xs">
              Primary Key: <code className="text-brand-600">application_id</code>. Records reason, status enum, submission timestamp, and clearance desk linkages.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-brand-700 font-bold block mb-1">TABLE: department_clearances</span>
            <p className="text-slate-500 font-sans text-xs">
              Composite Key: <code className="text-brand-600">(application_id, dept_code)</code>. Library, Accounts, Labs, Hostel, Sports clearance flags.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-brand-700 font-bold block mb-1">TABLE: issued_certificates</span>
            <p className="text-slate-500 font-sans text-xs">
              Primary Key: <code className="text-brand-600">tc_number</code>. Issued date, conduct rating, digital signature hash, verification audit.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center gap-3">
          <Server className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <span className="font-bold block">Frontend Ready for API Integration</span>
            <span className="text-blue-700 text-[11px]">
              Mock state handlers in this React dashboard can seamlessly be replaced with `axios`/`fetch` calls to an Express.js or Python FastAPI backend.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
