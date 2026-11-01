import {
  Student,
  TCApplication,
  IssuedCertificate,
  Department,
  DashboardStats,
  CreateApplicationDTO,
  UpdateApplicationStatusDTO,
} from '../types/index.js';

export interface IRepository {
  // Health & System
  getHealth(): Promise<{
    database: string;
    driver: 'mock' | 'mysql';
    status: 'healthy' | 'degraded';
    uptime: number;
    details?: string;
  }>;

  // Dashboard Stats
  getDashboardStats(): Promise<DashboardStats>;

  // Students
  getStudents(filters?: {
    department?: string;
    status?: string;
    search?: string;
  }): Promise<Student[]>;
  getStudentById(id: number): Promise<Student | null>;
  getStudentByRollNo(rollNo: string): Promise<Student | null>;

  // TC Applications
  getApplications(filters?: {
    status?: string;
    department?: string;
    search?: string;
  }): Promise<TCApplication[]>;
  getApplicationById(id: number): Promise<TCApplication | null>;
  createApplication(data: CreateApplicationDTO): Promise<TCApplication>;
  updateApplicationStatus(
    id: number,
    data: UpdateApplicationStatusDTO
  ): Promise<TCApplication | null>;

  // Issued Certificates
  getCertificates(search?: string): Promise<IssuedCertificate[]>;
  getCertificateById(id: number): Promise<IssuedCertificate | null>;
  issueCertificate(
    applicationId: number,
    issuerInfo?: { preparedBy?: string; verifiedBy?: string; principalName?: string }
  ): Promise<IssuedCertificate>;

  // Departments
  getDepartments(): Promise<Department[]>;
}
