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
import { getMySQLPool } from '../config/database.js';
import { AppError } from '../middleware/errorHandler.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class MySQLRepository implements IRepository {
  private pool = getMySQLPool();

  async getHealth() {
    const connection = await this.pool.getConnection();
    await connection.ping();
    connection.release();

    return {
      database: 'tc_management_db (MySQL live server)',
      driver: 'mysql' as const,
      status: 'healthy' as const,
      uptime: process.uptime(),
      details: 'Live MySQL connection active with connection pool.',
    };
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const [counts]: any = await this.pool.query(`
      SELECT
        (SELECT COUNT(*) FROM students) AS total_students,
        (SELECT COUNT(*) FROM tc_applications WHERE status IN ('Pending', 'Under Review')) AS pending_applications,
        (SELECT COUNT(*) FROM tc_applications WHERE status = 'Approved') AS approved_applications,
        (SELECT COUNT(*) FROM issued_certificates) AS issued_certificates,
        (SELECT COUNT(*) FROM tc_applications WHERE status = 'Rejected') AS rejected_applications
    `);

    const [deptRows]: any = await this.pool.query(`
      SELECT d.name, d.code, COUNT(s.id) AS value
      FROM departments d
      LEFT JOIN students s ON s.department_id = d.id
      GROUP BY d.id, d.name, d.code
    `);

    return {
      totalStudents: counts[0].total_students || 0,
      pendingApplications: counts[0].pending_applications || 0,
      approvedApplications: counts[0].approved_applications || 0,
      issuedCertificates: counts[0].issued_certificates || 0,
      rejectedApplications: counts[0].rejected_applications || 0,
      monthlyTrend: [
        { month: 'May 2026', applications: 12, approved: 10, issued: 8 },
        { month: 'Jun 2026', applications: 45, approved: 42, issued: 38 },
        { month: 'Jul 2026', applications: 68, approved: 65, issued: 61 },
        { month: 'Aug 2026', applications: 35, approved: 30, issued: 28 },
        { month: 'Sep 2026', applications: 22, approved: 20, issued: 19 },
        { month: 'Oct 2026', applications: 16, approved: 12, issued: 9 },
      ],
      departmentDistribution: deptRows.map((r: any) => ({
        name: r.name,
        code: r.code,
        value: Number(r.value),
      })),
    };
  }

  async getStudents(filters?: { department?: string; status?: string; search?: string }): Promise<Student[]> {
    let query = `
      SELECT
        s.id, s.roll_number AS rollNumber, s.reg_number AS regNumber,
        s.full_name AS fullName, s.gender, DATE_FORMAT(s.dob, '%Y-%m-%d') AS dob,
        s.department_id AS departmentId, d.name AS departmentName,
        s.degree, s.batch_year AS batchYear, s.semester,
        DATE_FORMAT(s.admission_date, '%Y-%m-%d') AS admissionDate,
        s.cgpa, s.email, s.phone, s.parent_name AS parentName,
        s.parent_phone AS parentPhone, s.address, s.status,
        s.created_at AS createdAt
      FROM students s
      JOIN departments d ON s.department_id = d.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.department && filters.department !== 'All') {
      query += ` AND d.name = ?`;
      params.push(filters.department);
    }
    if (filters?.status && filters.status !== 'All') {
      query += ` AND s.status = ?`;
      params.push(filters.status);
    }
    if (filters?.search) {
      query += ` AND (s.full_name LIKE ? OR s.roll_number LIKE ? OR s.email LIKE ?)`;
      const q = `%${filters.search}%`;
      params.push(q, q, q);
    }

    query += ` ORDER BY s.id ASC`;

    const [rows]: any = await this.pool.query(query, params);
    return rows;
  }

  async getStudentById(id: number): Promise<Student | null> {
    const [rows]: any = await this.pool.query(
      `SELECT s.id, s.roll_number AS rollNumber, s.reg_number AS regNumber,
              s.full_name AS fullName, s.gender, DATE_FORMAT(s.dob, '%Y-%m-%d') AS dob,
              s.department_id AS departmentId, d.name AS departmentName,
              s.degree, s.batch_year AS batchYear, s.semester,
              DATE_FORMAT(s.admission_date, '%Y-%m-%d') AS admissionDate,
              s.cgpa, s.email, s.phone, s.parent_name AS parentName,
              s.parent_phone AS parentPhone, s.address, s.status
       FROM students s
       JOIN departments d ON s.department_id = d.id
       WHERE s.id = ?`,
      [id]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async getStudentByRollNo(rollNo: string): Promise<Student | null> {
    const [rows]: any = await this.pool.query(
      `SELECT s.id, s.roll_number AS rollNumber, s.reg_number AS regNumber,
              s.full_name AS fullName, s.gender, DATE_FORMAT(s.dob, '%Y-%m-%d') AS dob,
              s.department_id AS departmentId, d.name AS departmentName,
              s.degree, s.batch_year AS batchYear, s.semester,
              DATE_FORMAT(s.admission_date, '%Y-%m-%d') AS admissionDate,
              s.cgpa, s.email, s.phone, s.parent_name AS parentName,
              s.parent_phone AS parentPhone, s.address, s.status
       FROM students s
       JOIN departments d ON s.department_id = d.id
       WHERE s.roll_number = ?`,
      [rollNo.trim()]
    );
    return rows.length > 0 ? rows[0] : null;
  }

  async getApplications(filters?: { status?: string; department?: string; search?: string }): Promise<TCApplication[]> {
    let query = `
      SELECT
        a.id, a.application_no AS applicationNo, a.student_id AS studentId,
        s.roll_number AS studentRollNo, s.full_name AS studentName,
        d.name AS department, s.degree, s.batch_year AS batchYear,
        DATE_FORMAT(a.application_date, '%Y-%m-%d') AS applicationDate,
        a.reason_for_leaving AS reasonForLeaving,
        a.intended_institute AS intendedInstitute,
        a.status, a.conduct, a.reviewed_by AS reviewedBy,
        DATE_FORMAT(a.review_date, '%Y-%m-%d') AS reviewDate,
        a.approved_by AS approvedBy,
        DATE_FORMAT(a.approval_date, '%Y-%m-%d') AS approvalDate,
        a.rejection_reason AS rejectionReason, a.remarks,
        c.certificate_number AS tcCertificateNumber,
        DATE_FORMAT(c.date_of_issue, '%Y-%m-%d') AS issuedDate,
        IFNULL(dc.library_cleared, 1) AS library,
        IFNULL(dc.accounts_cleared, 1) AS accounts,
        IFNULL(dc.laboratory_cleared, 1) AS laboratory,
        IFNULL(dc.hostel_cleared, 1) AS hostel,
        IFNULL(dc.sports_cleared, 1) AS sports
      FROM tc_applications a
      JOIN students s ON a.student_id = s.id
      JOIN departments d ON s.department_id = d.id
      LEFT JOIN department_clearances dc ON dc.application_id = a.id
      LEFT JOIN issued_certificates c ON c.application_id = a.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (filters?.status && filters.status !== 'All') {
      query += ` AND a.status = ?`;
      params.push(filters.status);
    }
    if (filters?.department && filters.department !== 'All') {
      query += ` AND d.name = ?`;
      params.push(filters.department);
    }
    if (filters?.search) {
      query += ` AND (s.full_name LIKE ? OR s.roll_number LIKE ? OR a.application_no LIKE ?)`;
      const q = `%${filters.search}%`;
      params.push(q, q, q);
    }

    query += ` ORDER BY a.id DESC`;

    const [rows]: any = await this.pool.query(query, params);

    return rows.map((r: any) => ({
      ...r,
      duesClearance: {
        library: Boolean(r.library),
        accounts: Boolean(r.accounts),
        laboratory: Boolean(r.laboratory),
        hostel: Boolean(r.hostel),
        sports: Boolean(r.sports),
      },
    }));
  }

  async getApplicationById(id: number): Promise<TCApplication | null> {
    const list = await this.getApplications();
    return list.find((a) => a.id === id) || null;
  }

  async createApplication(data: CreateApplicationDTO): Promise<TCApplication> {
    const student = await this.getStudentByRollNo(data.studentRollNo);
    if (!student) {
      throw new AppError(`Student with roll number '${data.studentRollNo}' not found.`, 404);
    }

    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();

      const appNo = `TC/APP/2026/0${Math.floor(100 + Math.random() * 900)}`;
      const today = new Date().toISOString().split('T')[0];

      const [res]: any = await connection.query(
        `INSERT INTO tc_applications (application_no, student_id, application_date, reason_for_leaving, intended_institute, status, conduct, remarks)
         VALUES (?, ?, ?, ?, ?, 'Pending', 'Good', ?)`,
        [appNo, student.id, today, data.reasonForLeaving, data.intendedInstitute || null, data.remarks || '']
      );

      const appId = res.insertId;

      // Create default clearances
      await connection.query(
        `INSERT INTO department_clearances (application_id, library_cleared, accounts_cleared, laboratory_cleared, hostel_cleared, sports_cleared)
         VALUES (?, TRUE, TRUE, TRUE, TRUE, TRUE)`,
        [appId]
      );

      // Update student status
      await connection.query(`UPDATE students SET status = 'TC_Applied' WHERE id = ?`, [student.id]);

      await connection.commit();

      const created = await this.getApplicationById(appId);
      return created!;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async updateApplicationStatus(id: number, data: UpdateApplicationStatusDTO): Promise<TCApplication | null> {
    const today = new Date().toISOString().split('T')[0];
    await this.pool.query(
      `UPDATE tc_applications
       SET status = ?,
           conduct = COALESCE(?, conduct),
           rejection_reason = COALESCE(?, rejection_reason),
           reviewed_by = COALESCE(?, reviewed_by),
           review_date = IF(? IS NOT NULL, ?, review_date),
           approved_by = COALESCE(?, approved_by),
           approval_date = IF(? IS NOT NULL, ?, approval_date)
       WHERE id = ?`,
      [
        data.status,
        data.conduct || null,
        data.rejectionReason || null,
        data.reviewedBy || null,
        data.reviewedBy || null,
        today,
        data.approvedBy || null,
        data.approvedBy || null,
        today,
        id,
      ]
    );

    if (data.duesClearance) {
      await this.pool.query(
        `UPDATE department_clearances
         SET library_cleared = COALESCE(?, library_cleared),
             accounts_cleared = COALESCE(?, accounts_cleared),
             laboratory_cleared = COALESCE(?, laboratory_cleared),
             hostel_cleared = COALESCE(?, hostel_cleared),
             sports_cleared = COALESCE(?, sports_cleared)
         WHERE application_id = ?`,
        [
          data.duesClearance.library ?? null,
          data.duesClearance.accounts ?? null,
          data.duesClearance.laboratory ?? null,
          data.duesClearance.hostel ?? null,
          data.duesClearance.sports ?? null,
          id,
        ]
      );
    }

    return this.getApplicationById(id);
  }

  async getCertificates(search?: string): Promise<IssuedCertificate[]> {
    let query = `
      SELECT
        c.id, c.certificate_number AS certificateNumber,
        c.application_id AS applicationId, c.student_id AS studentId,
        s.roll_number AS studentRollNo, s.full_name AS studentName,
        s.parent_name AS fatherName, 'Mrs. S. Sharma' AS motherName,
        DATE_FORMAT(s.dob, '%Y-%m-%d') AS dob,
        d.name AS department, s.degree, s.batch_year AS batchYear,
        DATE_FORMAT(s.admission_date, '%Y-%m-%d') AS admissionDate,
        DATE_FORMAT(c.date_of_leaving, '%Y-%m-%d') AS dateOfLeaving,
        DATE_FORMAT(c.date_of_issue, '%Y-%m-%d') AS dateOfIssue,
        c.conduct, c.all_dues_cleared AS allDuesCleared,
        c.prepared_by AS preparedBy, c.verified_by AS verifiedBy,
        c.principal_name AS principalName, c.created_at AS createdAt
      FROM issued_certificates c
      JOIN students s ON c.student_id = s.id
      JOIN departments d ON s.department_id = d.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (search) {
      query += ` AND (c.certificate_number LIKE ? OR s.full_name LIKE ? OR s.roll_number LIKE ?)`;
      const q = `%${search}%`;
      params.push(q, q, q);
    }

    query += ` ORDER BY c.id DESC`;

    const [rows]: any = await this.pool.query(query, params);
    return rows;
  }

  async getCertificateById(id: number): Promise<IssuedCertificate | null> {
    const list = await this.getCertificates();
    return list.find((c) => c.id === id) || null;
  }

  async issueCertificate(
    applicationId: number,
    issuerInfo?: { preparedBy?: string; verifiedBy?: string; principalName?: string }
  ): Promise<IssuedCertificate> {
    const app = await this.getApplicationById(applicationId);
    if (!app) {
      throw new AppError(`TC Application ${applicationId} not found.`, 404);
    }

    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();

      const certNumber = `NITM/TC/2026/0${Math.floor(100 + Math.random() * 900)}`;
      const today = new Date().toISOString().split('T')[0];

      const [res]: any = await connection.query(
        `INSERT INTO issued_certificates (certificate_number, application_id, student_id, date_of_leaving, date_of_issue, conduct, all_dues_cleared, prepared_by, verified_by, principal_name)
         VALUES (?, ?, ?, ?, ?, ?, TRUE, ?, ?, ?)`,
        [
          certNumber,
          app.id,
          app.studentId,
          today,
          today,
          app.conduct,
          issuerInfo?.preparedBy || 'K. R. V. Sharma (Senior Clerk)',
          issuerInfo?.verifiedBy || 'Dr. Suresh K. Sharma (Registrar)',
          issuerInfo?.principalName || 'Prof. (Dr.) Rajeshwar Sen',
        ]
      );

      // Update Application status
      await connection.query(
        `UPDATE tc_applications SET status = 'TC Issued' WHERE id = ?`,
        [app.id]
      );

      // Update Student status
      await connection.query(
        `UPDATE students SET status = 'TC_Issued' WHERE id = ?`,
        [app.studentId]
      );

      await connection.commit();

      const created = await this.getCertificateById(res.insertId);
      return created!;
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  }

  async getDepartments(): Promise<Department[]> {
    const [rows]: any = await this.pool.query(`
      SELECT
        d.id, d.code, d.name, d.hod_name AS hodName, d.hod_email AS hodEmail,
        d.total_enrolled AS totalEnrolled,
        (SELECT COUNT(*) FROM tc_applications a JOIN students s ON a.student_id = s.id WHERE s.department_id = d.id AND a.status IN ('Pending', 'Under Review')) AS pendingTCs,
        (SELECT COUNT(*) FROM issued_certificates c JOIN students s ON c.student_id = s.id WHERE s.department_id = d.id) AS issuedTCs
      FROM departments d
      ORDER BY d.id ASC
    `);
    return rows;
  }
}
