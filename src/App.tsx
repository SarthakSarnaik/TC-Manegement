import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { NavTab } from './components/layout/Sidebar';
import { DashboardView } from './components/views/DashboardView';
import { StudentsView } from './components/views/StudentsView';
import { ApplicationsView } from './components/views/ApplicationsView';
import { CertificatesView } from './components/views/CertificatesView';
import { DepartmentsView } from './components/views/DepartmentsView';
import { ReportsView } from './components/views/ReportsView';
import { SettingsView } from './components/views/SettingsView';
import { ApplicationDetailsModal } from './components/applications/ApplicationDetailsModal';
import { NewApplicationModal } from './components/applications/NewApplicationModal';
import { CertificateModal } from './components/certificates/CertificateModal';

import {
  INITIAL_STUDENTS,
  INITIAL_APPLICATIONS,
  INITIAL_ISSUED_CERTIFICATES,
  INITIAL_NOTIFICATIONS,
  COLLEGE_CONFIG,
} from './data/mockData';
import { Student, TCApplication, IssuedCertificate, NotificationItem, DuesStatus } from './types/tc';
import { CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  
  // App state
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [applications, setApplications] = useState<TCApplication[]>(INITIAL_APPLICATIONS);
  const [certificates, setCertificates] = useState<IssuedCertificate[]>(INITIAL_ISSUED_CERTIFICATES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals state
  const [selectedAppModal, setSelectedAppModal] = useState<TCApplication | null>(null);
  const [selectedCertModal, setSelectedCertModal] = useState<IssuedCertificate | null>(null);
  const [isNewAppModalOpen, setIsNewAppModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Status updates
  const handleUpdateStatus = (
    appId: string,
    newStatus: TCApplication['status'],
    updatedDues?: DuesStatus,
    conduct?: TCApplication['conduct'],
    rejectionReason?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const updated: TCApplication = {
            ...app,
            status: newStatus,
            duesClearance: updatedDues || app.duesClearance,
            conduct: conduct || app.conduct,
            rejectionReason: rejectionReason || app.rejectionReason,
          };
          if (newStatus === 'Approved') {
            updated.approvedBy = `${COLLEGE_CONFIG.principal} (Principal)`;
            updated.approvalDate = new Date().toISOString().split('T')[0];
          }
          return updated;
        }
        return app;
      })
    );

    // Add notification
    const app = applications.find((a) => a.id === appId);
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: `TC Application ${newStatus}`,
      message: `${app?.studentName} (${app?.studentRollNo}) application marked as ${newStatus}.`,
      time: 'Just now',
      type: newStatus === 'Approved' ? 'approval' : 'system',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Application for ${app?.studentName} marked as ${newStatus}`);
  };

  // Quick Approve
  const handleApproveQuick = (appId: string) => {
    handleUpdateStatus(appId, 'Approved');
  };

  // Generate & Issue Certificate
  const handleGenerateCertificate = (app: TCApplication) => {
    const student = students.find((s) => s.id === app.studentId || s.rollNumber === app.studentRollNo);
    const certNum = `NITM/TC/2026/0${Math.floor(Math.random() * 90) + 100}`;
    const today = new Date().toISOString().split('T')[0];

    const newCert: IssuedCertificate = {
      id: `CERT-${Date.now()}`,
      certificateNumber: certNum,
      applicationId: app.id,
      studentRollNo: app.studentRollNo,
      studentName: app.studentName,
      fatherName: student?.parentName || 'Mr. Ramesh Sharma',
      motherName: 'Mrs. Sunita Sharma',
      dob: student?.dob || '2003-05-14',
      department: app.department,
      degree: app.degree,
      batchYear: app.batchYear,
      admissionDate: student?.admissionDate || '2021-08-16',
      dateOfLeaving: today,
      dateOfIssue: today,
      conduct: app.conduct || 'Exemplary',
      reasonForLeaving: app.reasonForLeaving,
      allDuesCleared: true,
      preparedBy: 'K. R. V. Sharma (Senior Clerk)',
      verifiedBy: COLLEGE_CONFIG.registrar,
      principalName: COLLEGE_CONFIG.principal,
    };

    // Update certificate list
    setCertificates((prev) => [newCert, ...prev]);

    // Update application
    setApplications((prev) =>
      prev.map((a) =>
        a.id === app.id
          ? {
              ...a,
              status: 'TC Issued',
              tcCertificateNumber: certNum,
              issuedDate: today,
            }
          : a
      )
    );

    // Update student status
    if (student) {
      setStudents((prev) =>
        prev.map((s) => (s.id === student.id ? { ...s, status: 'TC_Issued' } : s))
      );
    }

    // Close application details modal if open
    setSelectedAppModal(null);

    // Open certificate preview modal immediately
    setSelectedCertModal(newCert);

    // Notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'Transfer Certificate Issued',
      message: `Official Certificate ${certNum} generated for ${app.studentName}.`,
      time: 'Just now',
      type: 'system',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`Transfer Certificate ${certNum} successfully issued!`);
  };

  // View Certificate from Application
  const handleViewCertificateQuick = (app: TCApplication) => {
    let cert = certificates.find(
      (c) => c.applicationId === app.id || c.studentRollNo === app.studentRollNo
    );
    if (!cert) {
      // create fallback preview
      cert = {
        id: `CERT-${Date.now()}`,
        certificateNumber: app.tcCertificateNumber || 'NITM/TC/2026/0099',
        applicationId: app.id,
        studentRollNo: app.studentRollNo,
        studentName: app.studentName,
        fatherName: 'Mr. Ramesh Sharma',
        motherName: 'Mrs. Sunita Sharma',
        dob: '2003-05-14',
        department: app.department,
        degree: app.degree,
        batchYear: app.batchYear,
        admissionDate: '2021-08-16',
        dateOfLeaving: app.issuedDate || '2026-10-15',
        dateOfIssue: app.issuedDate || '2026-10-15',
        conduct: app.conduct || 'Good',
        reasonForLeaving: app.reasonForLeaving,
        allDuesCleared: true,
        preparedBy: 'K. R. V. Sharma (Senior Clerk)',
        verifiedBy: COLLEGE_CONFIG.registrar,
        principalName: COLLEGE_CONFIG.principal,
      };
    }
    setSelectedCertModal(cert);
  };

  // Create new application
  const handleAddNewApplication = (newApp: TCApplication) => {
    setApplications((prev) => [newApp, ...prev]);

    // Update student status
    setStudents((prev) =>
      prev.map((s) => (s.id === newApp.studentId ? { ...s, status: 'TC_Applied' } : s))
    );

    // Add notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      title: 'New TC Request Lodged',
      message: `${newApp.studentName} (${newApp.studentRollNo}) submitted an application for ${newApp.reasonForLeaving}.`,
      time: 'Just now',
      type: 'application',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast(`New application submitted for ${newApp.studentName}`);
  };

  // Mark all notifications read
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const pendingCount = applications.filter(
    (a) => a.status === 'Pending' || a.status === 'Under Review'
  ).length;

  return (
    <Layout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      pendingCount={pendingCount}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      notifications={notifications}
      onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
      onOpenNewApplicationModal={() => setIsNewAppModalOpen(true)}
    >
      {/* Current Active View */}
      {currentTab === 'dashboard' && (
        <DashboardView
          students={students}
          applications={applications}
          certificates={certificates}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onViewApplication={(app) => setSelectedAppModal(app)}
          onApproveQuick={handleApproveQuick}
          onViewCertificateQuick={handleViewCertificateQuick}
          onOpenNewApplicationModal={() => setIsNewAppModalOpen(true)}
          onNavigateToTab={setCurrentTab}
        />
      )}

      {currentTab === 'students' && (
        <StudentsView
          students={students}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onInitiateApplicationForStudent={(student) => {
            setIsNewAppModalOpen(true);
          }}
        />
      )}

      {currentTab === 'applications' && (
        <ApplicationsView
          applications={applications}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onViewApplication={(app) => setSelectedAppModal(app)}
          onApproveQuick={handleApproveQuick}
          onViewCertificateQuick={handleViewCertificateQuick}
          onOpenNewApplicationModal={() => setIsNewAppModalOpen(true)}
        />
      )}

      {currentTab === 'certificates' && (
        <CertificatesView
          certificates={certificates}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelectCertificate={(cert) => setSelectedCertModal(cert)}
        />
      )}

      {currentTab === 'departments' && <DepartmentsView />}

      {currentTab === 'reports' && <ReportsView applications={applications} />}

      {currentTab === 'settings' && <SettingsView />}

      {/* Modals */}
      <ApplicationDetailsModal
        application={selectedAppModal}
        onClose={() => setSelectedAppModal(null)}
        onUpdateStatus={handleUpdateStatus}
        onGenerateCertificate={handleGenerateCertificate}
      />

      <CertificateModal
        certificate={selectedCertModal}
        onClose={() => setSelectedCertModal(null)}
      />

      <NewApplicationModal
        isOpen={isNewAppModalOpen}
        onClose={() => setIsNewAppModalOpen(false)}
        students={students}
        onSubmit={handleAddNewApplication}
      />

      {/* Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </Layout>
  );
};

export default App;
