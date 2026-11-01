export type Gender = 'Male' | 'Female' | 'Other';

export type StudentStatus = 'Active' | 'TC_Applied' | 'TC_Issued' | 'Alumni';

export type ApplicationStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'TC Issued';

export type ConductRating = 'Exemplary' | 'Good' | 'Satisfactory' | 'Fair';

export type ReasonForLeaving =
  | 'Higher Education'
  | 'Job / Employment'
  | 'Relocation / Family Shift'
  | 'Medical Reasons'
  | 'Personal / Financial'
  | 'Course Completed';

export interface DuesStatus {
  library: boolean;
  accounts: boolean;
  laboratory: boolean;
  hostel: boolean;
  sports: boolean;
}

export interface Department {
  id: number;
  code: string;
  name: string;
  hodName: string;
  hodEmail: string;
  totalEnrolled: number;
  pendingTCs?: number;
  issuedTCs?: number;
  createdAt?: string;
}

export interface Student {
  id: number;
  rollNumber: string;
  regNumber: string;
  fullName: string;
  gender: Gender;
  dob: string;
  departmentId: number;
  departmentName?: string;
  degree: string;
  batchYear: string;
  semester: number;
  admissionDate: string;
  cgpa: number;
  email: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  address: string;
  status: StudentStatus;
  dues?: DuesStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface TCApplication {
  id: number;
  applicationNo: string;
  studentId: number;
  studentRollNo?: string;
  studentName?: string;
  department?: string;
  degree?: string;
  batchYear?: string;
  applicationDate: string;
  reasonForLeaving: ReasonForLeaving;
  intendedInstitute?: string | null;
  status: ApplicationStatus;
  conduct: ConductRating;
  reviewedBy?: string | null;
  reviewDate?: string | null;
  approvedBy?: string | null;
  approvalDate?: string | null;
  rejectionReason?: string | null;
  remarks?: string | null;
  duesClearance: DuesStatus;
  tcCertificateNumber?: string | null;
  issuedDate?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface IssuedCertificate {
  id: number;
  certificateNumber: string;
  applicationId: number;
  studentId: number;
  studentRollNo: string;
  studentName: string;
  fatherName: string;
  motherName?: string;
  dob: string;
  department: string;
  degree: string;
  batchYear: string;
  admissionDate: string;
  dateOfLeaving: string;
  dateOfIssue: string;
  conduct: ConductRating;
  allDuesCleared: boolean;
  preparedBy: string;
  verifiedBy: string;
  principalName: string;
  createdAt?: string;
}

export interface DashboardStats {
  totalStudents: number;
  pendingApplications: number;
  approvedApplications: number;
  issuedCertificates: number;
  rejectedApplications: number;
  monthlyTrend: Array<{
    month: string;
    applications: number;
    approved: number;
    issued: number;
  }>;
  departmentDistribution: Array<{
    name: string;
    code: string;
    value: number;
  }>;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  details?: any;
  timestamp: string;
}

export interface CreateApplicationDTO {
  studentRollNo: string;
  reasonForLeaving: ReasonForLeaving;
  intendedInstitute?: string;
  remarks?: string;
}

export interface UpdateApplicationStatusDTO {
  status: ApplicationStatus;
  conduct?: ConductRating;
  reviewedBy?: string;
  approvedBy?: string;
  rejectionReason?: string;
  duesClearance?: Partial<DuesStatus>;
}
