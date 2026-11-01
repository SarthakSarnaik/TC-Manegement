-- ==========================================================
-- College TC Management System - Relational DBMS Schema (MySQL)
-- Third Normal Form (3NF) Relational Architecture
-- ==========================================================

CREATE DATABASE IF NOT EXISTS tc_management_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE tc_management_db;

-- ----------------------------------------------------------
-- 1. Table: departments
-- Stores institutional academic departments and HOD contacts
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  hod_name VARCHAR(100) NOT NULL,
  hod_email VARCHAR(120) NOT NULL,
  total_enrolled INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 2. Table: students
-- Student Master database with academic & demographic profiles
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  roll_number VARCHAR(20) NOT NULL UNIQUE,
  reg_number VARCHAR(30) NOT NULL UNIQUE,
  full_name VARCHAR(100) NOT NULL,
  gender ENUM('Male', 'Female', 'Other') NOT NULL,
  dob DATE NOT NULL,
  department_id INT NOT NULL,
  degree VARCHAR(50) NOT NULL DEFAULT 'B.Tech',
  batch_year VARCHAR(20) NOT NULL,
  semester TINYINT NOT NULL CHECK (semester BETWEEN 1 AND 8),
  admission_date DATE NOT NULL,
  cgpa DECIMAL(4, 2) NOT NULL CHECK (cgpa >= 0.00 AND cgpa <= 10.00),
  email VARCHAR(120) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  parent_name VARCHAR(100) NOT NULL,
  parent_phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  status ENUM('Active', 'TC_Applied', 'TC_Issued', 'Alumni') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_students_roll (roll_number),
  INDEX idx_students_dept (department_id),
  CONSTRAINT fk_students_department
    FOREIGN KEY (department_id) REFERENCES departments(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 3. Table: tc_applications
-- Lifecycle of Transfer Certificate requests submitted by students
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS tc_applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_no VARCHAR(35) NOT NULL UNIQUE,
  student_id INT NOT NULL,
  application_date DATE NOT NULL,
  reason_for_leaving ENUM(
    'Higher Education',
    'Job / Employment',
    'Relocation / Family Shift',
    'Medical Reasons',
    'Personal / Financial',
    'Course Completed'
  ) NOT NULL,
  intended_institute VARCHAR(255) NULL,
  status ENUM('Pending', 'Under Review', 'Approved', 'Rejected', 'TC Issued') DEFAULT 'Pending',
  conduct ENUM('Exemplary', 'Good', 'Satisfactory', 'Fair') DEFAULT 'Good',
  reviewed_by VARCHAR(100) NULL,
  review_date DATE NULL,
  approved_by VARCHAR(100) NULL,
  approval_date DATE NULL,
  rejection_reason TEXT NULL,
  remarks TEXT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_applications_student (student_id),
  INDEX idx_applications_status (status),
  INDEX idx_applications_date (application_date),
  CONSTRAINT fk_applications_student
    FOREIGN KEY (student_id) REFERENCES students(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 4. Table: department_clearances
-- Multi-nodal clearance checklist from 5 institutional desks
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS department_clearances (
  id INT AUTO_INCREMENT PRIMARY KEY,
  application_id INT NOT NULL UNIQUE,
  library_cleared BOOLEAN NOT NULL DEFAULT FALSE,
  accounts_cleared BOOLEAN NOT NULL DEFAULT FALSE,
  laboratory_cleared BOOLEAN NOT NULL DEFAULT FALSE,
  hostel_cleared BOOLEAN NOT NULL DEFAULT FALSE,
  sports_cleared BOOLEAN NOT NULL DEFAULT FALSE,
  all_cleared BOOLEAN GENERATED ALWAYS AS (
    library_cleared AND accounts_cleared AND laboratory_cleared AND hostel_cleared AND sports_cleared
  ) STORED,
  cleared_at TIMESTAMP NULL,
  remarks TEXT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_clearance_application
    FOREIGN KEY (application_id) REFERENCES tc_applications(id)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- ----------------------------------------------------------
-- 5. Table: issued_certificates
-- Permanent institutional ledger of generated Transfer Certificates
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS issued_certificates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  certificate_number VARCHAR(60) NOT NULL UNIQUE,
  application_id INT NOT NULL UNIQUE,
  student_id INT NOT NULL,
  date_of_leaving DATE NOT NULL,
  date_of_issue DATE NOT NULL,
  conduct ENUM('Exemplary', 'Good', 'Satisfactory', 'Fair') NOT NULL,
  all_dues_cleared BOOLEAN NOT NULL DEFAULT TRUE,
  prepared_by VARCHAR(100) NOT NULL,
  verified_by VARCHAR(100) NOT NULL,
  principal_name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_cert_student (student_id),
  INDEX idx_cert_num (certificate_number),
  CONSTRAINT fk_cert_application
    FOREIGN KEY (application_id) REFERENCES tc_applications(id)
    ON DELETE RESTRICT,
  CONSTRAINT fk_cert_student
    FOREIGN KEY (student_id) REFERENCES students(id)
    ON DELETE RESTRICT
) ENGINE=InnoDB;
