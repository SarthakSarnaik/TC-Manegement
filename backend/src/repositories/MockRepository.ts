import { IRepository } from './IRepository.js';
import {
  Student,
  TCApplication,
  IssuedCertificate,
  Department,
  DashboardStats,
  CreateApplicationDTO,
  UpdateApplicationStatusDTO,
} from '../types/index.js';
import { AppError } from '../middleware/errorHandler.js';

export class MockRepository implements IRepository {
  private departments: Department[] = [
    {
      id: 1,
      code: 'CSE',
      name: 'Computer Science & Engineering',
      hodName: 'Dr. Amitabh Banerjee',
      hodEmail: 'hod.cse@nitm.edu.in',
      totalEnrolled: 720,
      pendingTCs: 2,
      issuedTCs: 34,
    },
    {
      id: 2,
      code: 'IT',
      name: 'Information Technology',
      hodName: 'Dr. Priya Nair',
      hodEmail: 'hod.it@nitm.edu.in',
      totalEnrolled: 480,
      pendingTCs: 0,
      issuedTCs: 26,
    },
    {
      id: 3,
      code: 'ECE',
      name: 'Electronics & Communication',
      hodName: 'Dr. M. S. Venkatesh',
      hodEmail: 'hod.ece@nitm.edu.in',
      totalEnrolled: 540,
      pendingTCs: 2,
      issuedTCs: 19,
    },
    {
      id: 4,
      code: 'ME',
      name: 'Mechanical Engineering',
      hodName: 'Dr. R. K. Ganguly',
      hodEmail: 'hod.me@nitm.edu.in',
      totalEnrolled: 420,
      pendingTCs: 1,
      issuedTCs: 15,
    },
    {
      id: 5,
      code: 'CE',
      name: 'Civil Engineering',
      hodName: 'Dr. Hemant Kulkarni',
      hodEmail: 'hod.ce@nitm.edu.in',
      totalEnrolled: 360,
      pendingTCs: 0,
      issuedTCs: 12,
    },
    {
      id: 6,
      code: 'EEE',
      name: 'Electrical & Electronics',
      hodName: 'Dr. Sunita Paul',
      hodEmail: 'hod.eee@nitm.edu.in',
      totalEnrolled: 320,
      pendingTCs: 1,
      issuedTCs: 11,
    },
  ];

  private students: Student[] = [
    {
      id: 1,
      rollNumber: '21CS042',
      regNumber: 'REG20210042',
      fullName: 'Aarav Sharma',
      gender: 'Male',
      dob: '2003-05-14',
      departmentId: 1,
      departmentName: 'Computer Science & Engineering',
      degree: 'B.Tech',
      batchYear: '2021 - 2025',
      semester: 8,
      admissionDate: '2021-08-16',
      cgpa: 8.92,
      email: 'aarav.sharma21@nitm.edu.in',
      phone: '+91 98765 43210',
      parentName: 'Mr. Ramesh Sharma',
      parentPhone: '+91 98111 22334',
      address: 'H.No. 42, Green Park, South Delhi, Delhi 110016',
      status: 'TC_Applied',
      dues: { library: true, accounts: true, laboratory: true, hostel: true, sports: true },
    },
    {
      id: 2,
      rollNumber: '22IT018',
      regNumber: 'REG20220118',
      fullName: 'Ananya Iyer',
      gender: 'Female',
      dob: '2004-02-22',
      departmentId: 2,
      departmentName: 'Information Technology',
      degree: 'B.Tech',
      batchYear: '2022 - 2026',
      semester: 6,
      admissionDate: '2022-08-20',
      cgpa: 9.35,
      email: 'ananya.iyer22@nitm.edu.in',
      phone: '+91 94321 87650',
      parentName: 'Mr. Sundaram Iyer',
      parentPhone: '+91 94112 33445',
      address: 'Flat 304, Palm Grove Apartments, Bengaluru, Karnataka',
      status: 'TC_Issued',
      dues: { library: true, accounts: true, laboratory: true, hostel: true, sports: true },
    },
    {
      id: 3,
      rollNumber: '21ME075',
      regNumber: 'REG20210375',
      fullName: 'Rohan Varma',
      gender: 'Male',
      dob: '2002-11-10',
      departmentId: 4,
      departmentName: 'Mechanical Engineering',
      degree: 'B.Tech',
      batchYear: '2021 - 2025',
      semester: 8,
      admissionDate: '2021-08-18',
      cgpa: 7.84,
      email: 'rohan.varma21@nitm.edu.in',
      phone: '+91 99887 76655',
      parentName: 'Mr. Vikram Varma',
      parentPhone: '+91 99880 11223',
      address: 'Sector 14, Urban Estate, Gurugram, Haryana',
      status: 'TC_Applied',
      dues: { library: false, accounts: true, laboratory: false, hostel: true, sports: true },
    },
    {
      id: 4,
      rollNumber: '22EC031',
      regNumber: 'REG20220231',
      fullName: 'Pooja Deshmukh',
      gender: 'Female',
      dob: '2003-09-08',
      departmentId: 3,
      departmentName: 'Electronics & Communication',
      degree: 'B.Tech',
      batchYear: '2022 - 2026',
      semester: 6,
      admissionDate: '2022-08-22',
      cgpa: 8.65,
      email: 'pooja.d22@nitm.edu.in',
      phone: '+91 97654 32190',
      parentName: 'Mr. Anand Deshmukh',
      parentPhone: '+91 97112 99887',
      address: 'B-12, Shivaji Nagar, Pune, Maharashtra',
      status: 'TC_Applied',
      dues: { library: true, accounts: true, laboratory: true, hostel: true, sports: true },
    },
    {
      id: 5,
      rollNumber: '20CE009',
      regNumber: 'REG20200009',
      fullName: 'Kabir Mehta',
      gender: 'Male',
      dob: '2001-04-19',
      departmentId: 5,
      departmentName: 'Civil Engineering',
      degree: 'B.Tech',
      batchYear: '2020 - 2024',
      semester: 8,
      admissionDate: '2020-09-01',
      cgpa: 8.12,
      email: 'kabir.mehta20@nitm.edu.in',
      phone: '+91 91234 56789',
      parentName: 'Mr. Harish Mehta',
      parentPhone: '+91 91122 33445',
      address: '15, Civil Lines, Jaipur, Rajasthan',
      status: 'TC_Issued',
      dues: { library: true, accounts: true, laboratory: true, hostel: true, sports: true },
    },
    {
      id: 6,
      rollNumber: '23EE054',
      regNumber: 'REG20230454',
      fullName: 'Meera Nair',
      gender: 'Female',
      dob: '2004-12-03',
      departmentId: 6,
      departmentName: 'Electrical & Electronics',
      degree: 'B.Tech',
      batchYear: '2023 - 2027',
      semester: 4,
      admissionDate: '2023-08-14',
      cgpa: 8.42,
      email: 'meera.nair23@nitm.edu.in',
      phone: '+91 93456 78901',
      parentName: 'Mr. K. G. Nair',
      parentPhone: '+91 93112 44556',
      address: 'Lake View Enclave, Kochi, Kerala',
      status: 'TC_Applied',
      dues: { library: true, accounts: false, laboratory: true, hostel: true, sports: true },
    },
    {
      id: 7,
      rollNumber: '21CS102',
      regNumber: 'REG20210102',
      fullName: 'Divyansh Gupta',
      gender: 'Male',
      dob: '2003-01-25',
      departmentId: 1,
      departmentName: 'Computer Science & Engineering',
      degree: 'B.Tech',
      batchYear: '2021 - 2025',
      semester: 8,
      admissionDate: '2021-08-16',
      cgpa: 9.15,
      email: 'divyansh.g21@nitm.edu.in',
      phone: '+91 98123 45678',
      parentName: 'Mr. Sanjay Gupta',
      parentPhone: '+91 98111 88776',
      address: 'C-44, Nirman Vihar, Delhi 110092',
      status: 'Active',
      dues: { library: true, accounts: true, laboratory: true, hostel: true, sports: true },
    },
  ];

  private applications: TCApplication[] = [
    {
      id: 1,
      applicationNo: 'TC/APP/2026/0142',
      studentId: 1,
      studentRollNo: '21CS042',
      studentName: 'Aarav Sharma',
      department: 'Computer Science & Engineering',
      degree: 'B.Tech',
      batchYear: '2021 - 2025',
      applicationDate: '2026-10-18',
      reasonForLeaving: 'Higher Education',
      intendedInstitute: 'Indian Institute of Science (IISc), Bangalore',
      status: 'Pending',
      conduct: 'Exemplary',
      remarks: 'Qualified GATE with AIR 47. Completed all 8 semesters.',
      duesClearance: { library: true, accounts: true, laboratory: true, hostel: true, sports: true },
    },
    {
      id: 2,
      applicationNo: 'TC/APP/2026/0141',
      studentId: 4,
      studentRollNo: '22EC031',
      studentName: 'Pooja Deshmukh',
      department: 'Electronics & Communication',
      degree: 'B.Tech',
      batchYear: '2022 - 2026',
      applicationDate: '2026-10-17',
      reasonForLeaving: 'Relocation / Family Shift',
      intendedInstitute: 'College of Engineering, Pune (COEP)',
      status: 'Approved',
      conduct: 'Good',
      reviewedBy: 'Dr. Suresh K. Sharma',
      reviewDate: '2026-10-19',
      approvedBy: 'Prof. (Dr.) Rajeshwar Sen',
      approvalDate: '2026-10-20',
      remarks: 'Family relocated to Pune. NOC approved by Dean Academics.',
      duesClearance: { library: true, accounts: true, laboratory: true, hostel: true, sports: true },
    },
    {
      id: 3,
      applicationNo: 'TC/APP/2026/0140',
      studentId: 3,
      studentRollNo: '21ME075',
      studentName: 'Rohan Varma',
      department: 'Mechanical Engineering',
      degree: 'B.Tech',
      batchYear: '2021 - 2025',
      applicationDate: '2026-10-16',
      reasonForLeaving: 'Job / Employment',
      intendedInstitute: 'Tata Motors Limited, Pune',
      status: 'Under Review',
      conduct: 'Good',
      remarks: 'Pending Library clearance for 2 overdue books and CAD Lab equipment return.',
      duesClearance: { library: false, accounts: true, laboratory: false, hostel: true, sports: true },
    },
    {
      id: 4,
      applicationNo: 'TC/APP/2026/0139',
      studentId: 2,
      studentRollNo: '22IT018',
      studentName: 'Ananya Iyer',
      department: 'Information Technology',
      degree: 'B.Tech',
      batchYear: '2022 - 2026',
      applicationDate: '2026-10-12',
      reasonForLeaving: 'Higher Education',
      intendedInstitute: 'Carnegie Mellon University, USA',
      status: 'TC Issued',
      conduct: 'Exemplary',
      reviewedBy: 'Dr. Suresh K. Sharma',
      reviewDate: '2026-10-13',
      approvedBy: 'Prof. (Dr.) Rajeshwar Sen',
      approvalDate: '2026-10-14',
      tcCertificateNumber: 'NITM/TC/2026/0088',
      issuedDate: '2026-10-15',
      remarks: 'Original TC dispatched and archived.',
      duesClearance: { library: true, accounts: true, laboratory: true, hostel: true, sports: true },
    },
    {
      id: 5,
      applicationNo: 'TC/APP/2026/0137',
      studentId: 6,
      studentRollNo: '23EE054',
      studentName: 'Meera Nair',
      department: 'Electrical & Electronics',
      degree: 'B.Tech',
      batchYear: '2023 - 2027',
      applicationDate: '2026-10-09',
      reasonForLeaving: 'Medical Reasons',
      intendedInstitute: 'Local College in Kochi',
      status: 'Rejected',
      conduct: 'Good',
      reviewedBy: 'Dr. Suresh K. Sharma',
      reviewDate: '2026-10-10',
      rejectionReason: 'Tuition fees for Semester 4 (₹48,500) unpaid in Accounts desk.',
      remarks: 'Advised student to clear dues at finance counter.',
      duesClearance: { library: true, accounts: false, laboratory: true, hostel: true, sports: true },
    },
  ];

  private certificates: IssuedCertificate[] = [
    {
      id: 1,
      certificateNumber: 'NITM/TC/2026/0088',
      applicationId: 4,
      studentId: 2,
      studentRollNo: '22IT018',
      studentName: 'Ananya Iyer',
      fatherName: 'Mr. Sundaram Iyer',
      motherName: 'Mrs. Lakshmi Iyer',
      dob: '2004-02-22',
      department: 'Information Technology',
      degree: 'Bachelor of Technology (B.Tech)',
      batchYear: '2022 - 2026',
      admissionDate: '2022-08-20',
      dateOfLeaving: '2026-10-15',
      dateOfIssue: '2026-10-15',
      conduct: 'Exemplary',
      allDuesCleared: true,
      preparedBy: 'K. R. V. Sharma (Senior Clerk)',
      verifiedBy: 'Dr. Suresh K. Sharma (Registrar)',
      principalName: 'Prof. (Dr.) Rajeshwar Sen',
    },
    {
      id: 2,
      certificateNumber: 'NITM/TC/2026/0087',
      applicationId: 99,
      studentId: 5,
      studentRollNo: '20CE009',
      studentName: 'Kabir Mehta',
      fatherName: 'Mr. Harish Mehta',
      motherName: 'Mrs. Savita Mehta',
      dob: '2001-04-19',
      department: 'Civil Engineering',
      degree: 'Bachelor of Technology (B.Tech)',
      batchYear: '2020 - 2024',
      admissionDate: '2020-09-01',
      dateOfLeaving: '2026-10-08',
      dateOfIssue: '2026-10-08',
      conduct: 'Good',
      allDuesCleared: true,
      preparedBy: 'K. R. V. Sharma (Senior Clerk)',
      verifiedBy: 'Dr. Suresh K. Sharma (Registrar)',
      principalName: 'Prof. (Dr.) Rajeshwar Sen',
    },
  ];

  // 1. Health
  async getHealth() {
    return {
      database: 'tc_management_db (in-memory mock adapter)',
      driver: 'mock' as const,
      status: 'healthy' as const,
      uptime: process.uptime(),
      details: 'Mock repository active. Switch to MySQL tomorrow by setting DB_DRIVER=mysql in .env.',
    };
  }

  // 2. Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    const pending = this.applications.filter(
      (a) => a.status === 'Pending' || a.status === 'Under Review'
    ).length;
    const approved = this.applications.filter((a) => a.status === 'Approved').length;
    const issued = this.certificates.length;
    const rejected = this.applications.filter((a) => a.status === 'Rejected').length;

    return {
      totalStudents: 2840,
      pendingApplications: pending,
      approvedApplications: approved,
      issuedCertificates: issued,
      rejectedApplications: rejected,
      monthlyTrend: [
        { month: 'May 2026', applications: 12, approved: 10, issued: 8 },
        { month: 'Jun 2026', applications: 45, approved: 42, issued: 38 },
        { month: 'Jul 2026', applications: 68, approved: 65, issued: 61 },
        { month: 'Aug 2026', applications: 35, approved: 30, issued: 28 },
        { month: 'Sep 2026', applications: 22, approved: 20, issued: 19 },
        { month: 'Oct 2026', applications: 16, approved: 12, issued: 9 },
      ],
      departmentDistribution: this.departments.map((d) => ({
        name: d.name,
        code: d.code,
        value: d.totalEnrolled,
      })),
    };
  }

  // 3. Students
  async getStudents(filters?: { department?: string; status?: string; search?: string }): Promise<Student[]> {
    let result = [...this.students];

    if (filters?.department && filters.department !== 'All') {
      result = result.filter(
        (s) => s.departmentName?.toLowerCase() === filters.department?.toLowerCase()
      );
    }
    if (filters?.status && filters.status !== 'All') {
      result = result.filter((s) => s.status === filters.status);
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (s) =>
          s.fullName.toLowerCase().includes(q) ||
          s.rollNumber.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async getStudentById(id: number): Promise<Student | null> {
    return this.students.find((s) => s.id === id) || null;
  }

  async getStudentByRollNo(rollNo: string): Promise<Student | null> {
    return (
      this.students.find(
        (s) => s.rollNumber.toLowerCase() === rollNo.toLowerCase().trim()
      ) || null
    );
  }

  // 4. TC Applications
  async getApplications(filters?: {
    status?: string;
    department?: string;
    search?: string;
  }): Promise<TCApplication[]> {
    let result = [...this.applications];

    if (filters?.status && filters.status !== 'All') {
      result = result.filter((a) => a.status === filters.status);
    }
    if (filters?.department && filters.department !== 'All') {
      result = result.filter(
        (a) => a.department?.toLowerCase() === filters.department?.toLowerCase()
      );
    }
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.studentName?.toLowerCase().includes(q) ||
          a.studentRollNo?.toLowerCase().includes(q) ||
          a.applicationNo.toLowerCase().includes(q)
      );
    }

    return result.sort((a, b) => b.id - a.id);
  }

  async getApplicationById(id: number): Promise<TCApplication | null> {
    return this.applications.find((a) => a.id === id) || null;
  }

  async createApplication(data: CreateApplicationDTO): Promise<TCApplication> {
    const student = await this.getStudentByRollNo(data.studentRollNo);
    if (!student) {
      throw new AppError(`Student with roll number '${data.studentRollNo}' not found.`, 404);
    }

    // Check if student already has a pending or approved application
    const existing = this.applications.find(
      (a) =>
        a.studentId === student.id &&
        (a.status === 'Pending' || a.status === 'Under Review' || a.status === 'Approved')
    );
    if (existing) {
      throw new AppError(
        `Student already has an active application in process (${existing.applicationNo}).`,
        400
      );
    }

    const nextId = this.applications.length > 0 ? Math.max(...this.applications.map((a) => a.id)) + 1 : 1;
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const appNo = `TC/APP/2026/0${randomSuffix}`;
    const today = new Date().toISOString().split('T')[0];

    const newApp: TCApplication = {
      id: nextId,
      applicationNo: appNo,
      studentId: student.id,
      studentRollNo: student.rollNumber,
      studentName: student.fullName,
      department: student.departmentName || 'Computer Science & Engineering',
      degree: student.degree,
      batchYear: student.batchYear,
      applicationDate: today,
      reasonForLeaving: data.reasonForLeaving,
      intendedInstitute: data.intendedInstitute || null,
      status: 'Pending',
      conduct: 'Good',
      remarks: data.remarks || 'Application registered via API.',
      duesClearance: student.dues ? { ...student.dues } : { library: true, accounts: true, laboratory: true, hostel: true, sports: true },
    };

    this.applications.unshift(newApp);

    // Update student status
    student.status = 'TC_Applied';

    return newApp;
  }

  async updateApplicationStatus(
    id: number,
    data: UpdateApplicationStatusDTO
  ): Promise<TCApplication | null> {
    const app = await this.getApplicationById(id);
    if (!app) return null;

    app.status = data.status;
    if (data.conduct) app.conduct = data.conduct;
    if (data.rejectionReason) app.rejectionReason = data.rejectionReason;
    if (data.reviewedBy) {
      app.reviewedBy = data.reviewedBy;
      app.reviewDate = new Date().toISOString().split('T')[0];
    }
    if (data.approvedBy) {
      app.approvedBy = data.approvedBy;
      app.approvalDate = new Date().toISOString().split('T')[0];
    }
    if (data.duesClearance) {
      app.duesClearance = {
        ...app.duesClearance,
        ...data.duesClearance,
      };
    }

    return app;
  }

  // 5. Issued Certificates
  async getCertificates(search?: string): Promise<IssuedCertificate[]> {
    let result = [...this.certificates];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.certificateNumber.toLowerCase().includes(q) ||
          c.studentName.toLowerCase().includes(q) ||
          c.studentRollNo.toLowerCase().includes(q)
      );
    }
    return result.sort((a, b) => b.id - a.id);
  }

  async getCertificateById(id: number): Promise<IssuedCertificate | null> {
    return this.certificates.find((c) => c.id === id) || null;
  }

  async issueCertificate(
    applicationId: number,
    issuerInfo?: { preparedBy?: string; verifiedBy?: string; principalName?: string }
  ): Promise<IssuedCertificate> {
    const app = await this.getApplicationById(applicationId);
    if (!app) {
      throw new AppError(`TC Application with ID ${applicationId} not found.`, 404);
    }

    if (app.status === 'TC Issued' && app.tcCertificateNumber) {
      const existingCert = this.certificates.find((c) => c.applicationId === applicationId);
      if (existingCert) return existingCert;
    }

    const student = await this.getStudentById(app.studentId);
    if (!student) {
      throw new AppError(`Student linked to application not found.`, 404);
    }

    const nextId = this.certificates.length > 0 ? Math.max(...this.certificates.map((c) => c.id)) + 1 : 1;
    const randomSerial = Math.floor(100 + Math.random() * 900);
    const certNumber = `NITM/TC/2026/0${randomSerial}`;
    const today = new Date().toISOString().split('T')[0];

    const cert: IssuedCertificate = {
      id: nextId,
      certificateNumber: certNumber,
      applicationId: app.id,
      studentId: student.id,
      studentRollNo: student.rollNumber,
      studentName: student.fullName,
      fatherName: student.parentName,
      motherName: 'Mrs. S. Sharma',
      dob: student.dob,
      department: student.departmentName || app.department || 'Engineering',
      degree: student.degree,
      batchYear: student.batchYear,
      admissionDate: student.admissionDate,
      dateOfLeaving: today,
      dateOfIssue: today,
      conduct: app.conduct,
      allDuesCleared: true,
      preparedBy: issuerInfo?.preparedBy || 'K. R. V. Sharma (Senior Clerk)',
      verifiedBy: issuerInfo?.verifiedBy || 'Dr. Suresh K. Sharma (Registrar)',
      principalName: issuerInfo?.principalName || 'Prof. (Dr.) Rajeshwar Sen',
    };

    this.certificates.unshift(cert);

    // Update Application
    app.status = 'TC Issued';
    app.tcCertificateNumber = certNumber;
    app.issuedDate = today;

    // Update Student
    student.status = 'TC_Issued';

    return cert;
  }

  // 6. Departments
  async getDepartments(): Promise<Department[]> {
    return [...this.departments];
  }
}
