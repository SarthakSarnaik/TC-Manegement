export type DuesStatus = {
  library: boolean;
  accounts: boolean;
  laboratory: boolean;
  hostel: boolean;
  sports: boolean;
};

export type StudentStatus = 'Active' | 'TC_Applied' | 'TC_Issued' | 'Alumni';

export interface Student {
  id: string;
  rollNumber: string;
  regNumber: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  department: string;
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
  dues: DuesStatus;
  status: StudentStatus;
  avatarUrl?: string;
}

export type ApplicationStatus = 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'TC Issued';

export type ReasonForLeaving = 
  | 'Higher Education' 
  | 'Job / Employment' 
  | 'Relocation / Family Shift' 
  | 'Medical Reasons' 
  | 'Personal / Financial' 
  | 'Course Completed';

export interface TCApplication {
  id: string;
  applicationNo: string;
  studentId: string;
  studentRollNo: string;
  studentName: string;
  department: string;
  degree: string;
  batchYear: string;
  applicationDate: string;
  reasonForLeaving: ReasonForLeaving;
  intendedInstitute?: string;
  status: ApplicationStatus;
  duesClearance: DuesStatus;
  conduct: 'Exemplary' | 'Good' | 'Satisfactory' | 'Fair';
  reviewedBy?: string;
  reviewDate?: string;
  approvedBy?: string;
  approvalDate?: string;
  rejectionReason?: string;
  tcCertificateNumber?: string;
  issuedDate?: string;
  remarks?: string;
}

export interface IssuedCertificate {
  id: string;
  certificateNumber: string;
  applicationId: string;
  studentRollNo: string;
  studentName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  department: string;
  degree: string;
  batchYear: string;
  admissionDate: string;
  dateOfLeaving: string;
  dateOfIssue: string;
  conduct: 'Exemplary' | 'Good' | 'Satisfactory' | 'Fair';
  reasonForLeaving: ReasonForLeaving;
  allDuesCleared: boolean;
  preparedBy: string;
  verifiedBy: string;
  principalName: string;
}

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  hodName: string;
  hodEmail: string;
  totalStudents: number;
  pendingTCs: number;
  issuedTCs: number;
  iconName: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'application' | 'approval' | 'clearance' | 'system';
  read: boolean;
  linkId?: string;
}
