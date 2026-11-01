-- ==========================================================
-- College TC Management System - Realistic Seed Data
-- ==========================================================

USE tc_management_db;

-- 1. Seed Departments
INSERT INTO departments (code, name, hod_name, hod_email, total_enrolled) VALUES
('CSE', 'Computer Science & Engineering', 'Dr. Amitabh Banerjee', 'hod.cse@nitm.edu.in', 720),
('IT', 'Information Technology', 'Dr. Priya Nair', 'hod.it@nitm.edu.in', 480),
('ECE', 'Electronics & Communication', 'Dr. M. S. Venkatesh', 'hod.ece@nitm.edu.in', 540),
('ME', 'Mechanical Engineering', 'Dr. R. K. Ganguly', 'hod.me@nitm.edu.in', 420),
('CE', 'Civil Engineering', 'Dr. Hemant Kulkarni', 'hod.ce@nitm.edu.in', 360),
('EEE', 'Electrical & Electronics', 'Dr. Sunita Paul', 'hod.eee@nitm.edu.in', 320);

-- 2. Seed Students
INSERT INTO students (roll_number, reg_number, full_name, gender, dob, department_id, degree, batch_year, semester, admission_date, cgpa, email, phone, parent_name, parent_phone, address, status) VALUES
('21CS042', 'REG20210042', 'Aarav Sharma', 'Male', '2003-05-14', 1, 'B.Tech', '2021 - 2025', 8, '2021-08-16', 8.92, 'aarav.sharma21@nitm.edu.in', '+91 98765 43210', 'Mr. Ramesh Sharma', '+91 98111 22334', 'H.No. 42, Green Park, South Delhi, Delhi 110016', 'TC_Applied'),
('22IT018', 'REG20220118', 'Ananya Iyer', 'Female', '2004-02-22', 2, 'B.Tech', '2022 - 2026', 6, '2022-08-20', 9.35, 'ananya.iyer22@nitm.edu.in', '+91 94321 87650', 'Mr. Sundaram Iyer', '+91 94112 33445', 'Flat 304, Palm Grove Apartments, Bengaluru, Karnataka', 'TC_Issued'),
('21ME075', 'REG20210375', 'Rohan Varma', 'Male', '2002-11-10', 4, 'B.Tech', '2021 - 2025', 8, '2021-08-18', 7.84, 'rohan.varma21@nitm.edu.in', '+91 99887 76655', 'Mr. Vikram Varma', '+91 99880 11223', 'Sector 14, Urban Estate, Gurugram, Haryana', 'TC_Applied'),
('22EC031', 'REG20220231', 'Pooja Deshmukh', 'Female', '2003-09-08', 3, 'B.Tech', '2022 - 2026', 6, '2022-08-22', 8.65, 'pooja.d22@nitm.edu.in', '+91 97654 32190', 'Mr. Anand Deshmukh', '+91 97112 99887', 'B-12, Shivaji Nagar, Pune, Maharashtra', 'TC_Applied'),
('20CE009', 'REG20200009', 'Kabir Mehta', 'Male', '2001-04-19', 5, 'B.Tech', '2020 - 2024', 8, '2020-09-01', 8.12, 'kabir.mehta20@nitm.edu.in', '+91 91234 56789', 'Mr. Harish Mehta', '+91 91122 33445', '15, Civil Lines, Jaipur, Rajasthan', 'TC_Issued'),
('23EE054', 'REG20230454', 'Meera Nair', 'Female', '2004-12-03', 6, 'B.Tech', '2023 - 2027', 4, '2023-08-14', 8.42, 'meera.nair23@nitm.edu.in', '+91 93456 78901', 'Mr. K. G. Nair', '+91 93112 44556', 'Lake View Enclave, Kochi, Kerala', 'TC_Applied'),
('21CS102', 'REG20210102', 'Divyansh Gupta', 'Male', '2003-01-25', 1, 'B.Tech', '2021 - 2025', 8, '2021-08-16', 9.15, 'divyansh.g21@nitm.edu.in', '+91 98123 45678', 'Mr. Sanjay Gupta', '+91 98111 88776', 'C-44, Nirman Vihar, Delhi 110092', 'Active'),
('22IT045', 'REG20220145', 'Sneha Reddy', 'Female', '2003-07-16', 2, 'B.Tech', '2022 - 2026', 6, '2022-08-20', 8.78, 'sneha.r22@nitm.edu.in', '+91 96543 21870', 'Mr. Narayana Reddy', '+91 96112 55443', 'Banjara Hills, Road No. 12, Hyderabad, Telangana', 'Active');

-- 3. Seed Applications
INSERT INTO tc_applications (id, application_no, student_id, application_date, reason_for_leaving, intended_institute, status, conduct, reviewed_by, review_date, approved_by, approval_date, remarks) VALUES
(1, 'TC/APP/2026/0142', 1, '2026-10-18', 'Higher Education', 'Indian Institute of Science (IISc), Bangalore', 'Pending', 'Exemplary', NULL, NULL, NULL, NULL, 'GATE Rank 47'),
(2, 'TC/APP/2026/0141', 4, '2026-10-17', 'Relocation / Family Shift', 'College of Engineering, Pune (COEP)', 'Approved', 'Good', 'Dr. Suresh K. Sharma', '2026-10-19', 'Prof. (Dr.) Rajeshwar Sen', '2026-10-20', 'Family shifted to Pune'),
(3, 'TC/APP/2026/0140', 3, '2026-10-16', 'Job / Employment', 'Tata Motors Limited, Pune', 'Under Review', 'Good', NULL, NULL, NULL, NULL, 'Pending Library equipment clearance'),
(4, 'TC/APP/2026/0139', 2, '2026-10-12', 'Higher Education', 'Carnegie Mellon University, USA', 'TC Issued', 'Exemplary', 'Dr. Suresh K. Sharma', '2026-10-13', 'Prof. (Dr.) Rajeshwar Sen', '2026-10-14', 'Original TC issued & archived'),
(5, 'TC/APP/2026/0137', 6, '2026-10-09', 'Medical Reasons', 'Local College in Kochi', 'Rejected', 'Good', 'Dr. Suresh K. Sharma', '2026-10-10', NULL, NULL, 'Unpaid fees in Accounts desk');

-- 4. Seed Clearances
INSERT INTO department_clearances (application_id, library_cleared, accounts_cleared, laboratory_cleared, hostel_cleared, sports_cleared, remarks) VALUES
(1, TRUE, TRUE, TRUE, TRUE, TRUE, 'All clearances received'),
(2, TRUE, TRUE, TRUE, TRUE, TRUE, 'Dean academics clearance granted'),
(3, FALSE, TRUE, FALSE, TRUE, TRUE, 'Library books and CAD Lab equipment pending'),
(4, TRUE, TRUE, TRUE, TRUE, TRUE, 'Full clearance certified'),
(5, TRUE, FALSE, TRUE, TRUE, TRUE, 'Semester 4 tuition fees overdue');

-- 5. Seed Issued Certificates
INSERT INTO issued_certificates (certificate_number, application_id, student_id, date_of_leaving, date_of_issue, conduct, all_dues_cleared, prepared_by, verified_by, principal_name) VALUES
('NITM/TC/2026/0088', 4, 2, '2026-10-15', '2026-10-15', 'Exemplary', TRUE, 'K. R. V. Sharma', 'Dr. Suresh K. Sharma', 'Prof. (Dr.) Rajeshwar Sen');
