import React from 'react';
import { Users, Clock, CheckCircle, Award } from 'lucide-react';
import { StatCard } from '../dashboard/StatCard';
import { QuickActionBanner } from '../dashboard/QuickActionBanner';
import { ApplicationTrendChart } from '../dashboard/ApplicationTrendChart';
import { DepartmentDistributionChart } from '../dashboard/DepartmentDistributionChart';
import { RecentApplicationsTable } from '../dashboard/RecentApplicationsTable';
import { Student, TCApplication, IssuedCertificate } from '../../types/tc';

interface DashboardViewProps {
  students: Student[];
  applications: TCApplication[];
  certificates: IssuedCertificate[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onViewApplication: (app: TCApplication) => void;
  onApproveQuick: (appId: string) => void;
  onViewCertificateQuick: (app: TCApplication) => void;
  onOpenNewApplicationModal: () => void;
  onNavigateToTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  applications,
  certificates,
  searchQuery,
  onSearchChange,
  onViewApplication,
  onApproveQuick,
  onViewCertificateQuick,
  onOpenNewApplicationModal,
  onNavigateToTab,
}) => {
  const totalStudentsCount = 2840; // Total across all batches
  const pendingCount = applications.filter(
    (a) => a.status === 'Pending' || a.status === 'Under Review'
  ).length;
  const approvedCount = applications.filter((a) => a.status === 'Approved').length;
  const issuedCount = certificates.length + applications.filter((a) => a.status === 'TC Issued').length;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <QuickActionBanner
        pendingApprovalsCount={pendingCount}
        approvedReadyForIssueCount={approvedCount}
        onFilterPending={() => onNavigateToTab('applications')}
        onFilterApproved={() => onNavigateToTab('applications')}
        onOpenNewApplication={onOpenNewApplicationModal}
      />

      {/* 4 Statistic Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Students"
          value={totalStudentsCount.toLocaleString()}
          subtitle="Enrolled across 6 departments"
          icon={Users}
          colorScheme="blue"
          trend={{ value: "+4.2% YoY", isPositive: true }}
          onClick={() => onNavigateToTab('students')}
        />

        <StatCard
          title="Pending Applications"
          value={pendingCount}
          subtitle="Awaiting clearance verification"
          icon={Clock}
          colorScheme="amber"
          trend={{ value: "-8% this week", isPositive: true }}
          onClick={() => onNavigateToTab('applications')}
        />

        <StatCard
          title="Approved Applications"
          value={approvedCount}
          subtitle="Clearance verified, ready for TC"
          icon={CheckCircle}
          colorScheme="emerald"
          trend={{ value: "+15% velocity", isPositive: true }}
          onClick={() => onNavigateToTab('applications')}
        />

        <StatCard
          title="TC Issued"
          value={issuedCount}
          subtitle="Official certificates generated"
          icon={Award}
          colorScheme="indigo"
          trend={{ value: "+22 this term", isPositive: true }}
          onClick={() => onNavigateToTab('certificates')}
        />
      </div>

      {/* Charts Row: Trend & Department Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <ApplicationTrendChart />
        </div>
        <div className="lg:col-span-5">
          <DepartmentDistributionChart />
        </div>
      </div>

      {/* Recent Applications Table */}
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
