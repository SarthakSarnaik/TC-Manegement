# College TC Management System - Backend REST API (DBMS Phase 2)

A robust, type-safe RESTful API server for the **Transfer Certificate (TC) Management System**, built with **Node.js, Express.js, TypeScript, and MySQL**.

---

## 🏛️ Architecture Overview

The backend uses a clean, decoupled **Layered Architecture** powered by the **Repository Pattern**:

```
Client Requests (Frontend / Postman / cURL)
                   │
                   ▼
         Express App (app.ts)
  [CORS, Body Parser, Request Logger]
                   │
                   ▼
     Routes Layer (/api/*)
  [Zod Request Validation Middleware]
                   │
                   ▼
         Controllers Layer
     [HTTP Request/Response Handling]
                   │
                   ▼
          Services Layer
      [College Business Logic & Rules]
                   │
                   ▼
         Repository Interface (IRepository)
         ┌─────────┴─────────┐
         ▼                   ▼
  MockRepository       MySQLRepository
(In-Memory Adapter) (Live MySQL Connection Pool)
```

### Key Architectural Strengths:
1. **Zero Downtime Without MySQL**: You do not need MySQL installed right now. The server runs with an in-memory **Mock Database Adapter** (`DB_DRIVER=mock`), allowing full API testing today.
2. **Instant Switch to MySQL Tomorrow**: Changing `DB_DRIVER=mysql` in `.env` activates real SQL queries via connection pool without altering a single line of controller or route code.
3. **Type-Safe DTOs & Validation**: All request payloads are validated using **Zod** with descriptive field-level error messages.
4. **Centralized Error Handling**: Errors, status codes (200, 201, 400, 404, 409, 500), and database constraints are handled systematically in `errorHandler.ts`.

---

## 📁 Directory Structure

```
backend/
├── .env.example                     # Safe environment template (placeholder values only)
├── .env                             # Active environment configuration (default: mock mode)
├── package.json                     # Dependencies: express, mysql2, zod, dotenv, cors, tsx
├── tsconfig.json                    # Strict NodeNext TypeScript configuration
├── database/
│   ├── schema.sql                   # 3NF Relational MySQL schema DDL
│   └── seed.sql                     # Realistic Indian engineering college seed data
├── src/
│   ├── index.ts                     # Server bootstrapper & graceful shutdown
│   ├── app.ts                       # Express app factory, middlewares & route mounting
│   ├── config/
│   │   ├── env.ts                   # Environment variable loader
│   │   └── database.ts              # MySQL connection pool & connectivity tester
│   ├── types/
│   │   └── index.ts                 # Domain interfaces (Student, Application, DTOs)
│   ├── middleware/
│   │   ├── errorHandler.ts          # Centralized error handler & custom AppError
│   │   ├── notFound.ts              # 404 handler for unmatched routes
│   │   ├── validate.ts              # Zod validation middleware
│   │   └── logger.ts                # HTTP request timing logger
│   ├── repositories/
│   │   ├── IRepository.ts           # Contract interface for data access
│   │   ├── MockRepository.ts        # In-memory mock adapter
│   │   ├── MySQLRepository.ts       # Production MySQL implementation (prepared queries)
│   │   └── index.ts                 # Factory: automatically resolves Mock vs MySQL
│   ├── services/
│   │   ├── healthService.ts
│   │   ├── dashboardService.ts
│   │   ├── studentService.ts
│   │   ├── applicationService.ts
│   │   ├── certificateService.ts
│   │   └── departmentService.ts
│   ├── controllers/
│   │   ├── healthController.ts
│   │   ├── dashboardController.ts
│   │   ├── studentController.ts
│   │   ├── applicationController.ts
│   │   ├── certificateController.ts
│   │   └── departmentController.ts
│   ├── validations/
│   │   └── applicationValidation.ts # Zod schemas for POST and PATCH
│   └── routes/
│       ├── healthRoutes.ts
│       ├── dashboardRoutes.ts
│       ├── studentRoutes.ts
│       ├── applicationRoutes.ts
│       ├── certificateRoutes.ts
│       ├── departmentRoutes.ts
│       └── index.ts
└── README.md
```

---

## 🗄️ Relational Database Schema Design (MySQL)

Located in `backend/database/schema.sql`:

1. **`departments`**:
   - `id` (PK, INT AUTO_INCREMENT)
   - `code` (VARCHAR(10) UNIQUE, e.g. 'CSE', 'IT', 'ECE', 'ME', 'CE', 'EEE')
   - `name` (VARCHAR(120)), `hod_name`, `hod_email`, `total_enrolled`
2. **`students`**:
   - `id` (PK, INT AUTO_INCREMENT)
   - `roll_number` (VARCHAR(20) UNIQUE, e.g. '21CS042')
   - `reg_number` (VARCHAR(30) UNIQUE)
   - `full_name`, `gender`, `dob`, `degree`, `batch_year`, `semester`, `admission_date`, `cgpa`, `email`, `phone`, `parent_name`, `parent_phone`, `address`
   - `department_id` (FK -> `departments.id` ON DELETE RESTRICT)
   - `status` (ENUM: 'Active', 'TC_Applied', 'TC_Issued', 'Alumni')
3. **`tc_applications`**:
   - `id` (PK, INT AUTO_INCREMENT)
   - `application_no` (VARCHAR(35) UNIQUE, e.g. 'TC/APP/2026/0142')
   - `student_id` (FK -> `students.id` ON DELETE RESTRICT)
   - `application_date`, `reason_for_leaving`, `intended_institute`
   - `status` (ENUM: 'Pending', 'Under Review', 'Approved', 'Rejected', 'TC Issued')
   - `conduct` (ENUM: 'Exemplary', 'Good', 'Satisfactory', 'Fair')
   - `reviewed_by`, `review_date`, `approved_by`, `approval_date`, `rejection_reason`, `remarks`
4. **`department_clearances`**:
   - `id` (PK, INT AUTO_INCREMENT)
   - `application_id` (FK -> `tc_applications.id` ON DELETE CASCADE)
   - `library_cleared`, `accounts_cleared`, `laboratory_cleared`, `hostel_cleared`, `sports_cleared` (BOOLEAN)
   - `all_cleared` (GENERATED ALWAYS AS virtual flag)
5. **`issued_certificates`**:
   - `id` (PK, INT AUTO_INCREMENT)
   - `certificate_number` (VARCHAR(60) UNIQUE, e.g. 'NITM/TC/2026/0088')
   - `application_id` (FK -> `tc_applications.id`), `student_id` (FK -> `students.id`)
   - `date_of_leaving`, `date_of_issue`, `conduct`, `all_dues_cleared`, `prepared_by`, `verified_by`, `principal_name`

---

## 📡 REST API Endpoints

Base URL: `http://localhost:3001/api`

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| **GET** | `/health` | Check API and Database status | `200 OK` |
| **GET** | `/dashboard/stats` | Counters, monthly trend, and department stats | `200 OK` |
| **GET** | `/students` | Get all students (filter by `department`, `status`, `search`) | `200 OK` |
| **GET** | `/students/:id` | Get student by internal numeric ID | `200 OK` / `404` |
| **GET** | `/students/roll/:rollNo` | Get student by Roll Number (e.g. `21CS042`) | `200 OK` / `404` |
| **GET** | `/applications` | Get TC applications (filter by `status`, `department`, `search`) | `200 OK` |
| **GET** | `/applications/:id` | Get single TC application with clearance dues checklist | `200 OK` / `404` |
| **POST** | `/applications` | Submit new TC application | `201 Created` / `400` |
| **PATCH** | `/applications/:id/status` | Update application status (`Approved`, `Rejected`, etc.) | `200 OK` / `400` |
| **POST** | `/applications/:id/issue-tc` | Issue official certificate for an approved application | `201 Created` / `400` |
| **GET** | `/certificates` | Get all issued Transfer Certificates (searchable) | `200 OK` |
| **GET** | `/certificates/:id` | Get single issued certificate | `200 OK` / `404` |
| **GET** | `/departments` | Get all academic departments with HOD contacts & counts | `200 OK` |

### Sample POST `/api/applications` Request Body
```json
{
  "studentRollNo": "21CS102",
  "reasonForLeaving": "Course Completed",
  "intendedInstitute": "Microsoft India R&D",
  "remarks": "Completed degree requirements."
}
```

### Sample Response:
```json
{
  "success": true,
  "message": "TC Application created successfully.",
  "data": {
    "id": 6,
    "applicationNo": "TC/APP/2026/0412",
    "studentId": 7,
    "studentRollNo": "21CS102",
    "studentName": "Divyansh Gupta",
    "department": "Computer Science & Engineering",
    "degree": "B.Tech",
    "batchYear": "2021 - 2025",
    "applicationDate": "2026-10-21",
    "reasonForLeaving": "Course Completed",
    "status": "Pending",
    "conduct": "Good",
    "duesClearance": {
      "library": true,
      "accounts": true,
      "laboratory": true,
      "hostel": true,
      "sports": true
    }
  },
  "timestamp": "2026-10-21T18:38:00.000Z"
}
```

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env`:

```ini
# Server Configuration
PORT=3001
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

# Database Mode: 'mock' (default) or 'mysql'
DB_DRIVER=mock

# MySQL Connection (Used when DB_DRIVER=mysql)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tc_management_db
DB_USER=root
DB_PASSWORD=your_password_here
DB_CONNECTION_LIMIT=10
```

> [!NOTE]
> `.env.example` contains placeholder values only. Never commit real database passwords to version control.

---

## 🚀 How to Run the Backend

### From the root folder:
```powershell
# Run backend development server on port 3001
npm run backend:dev

# Run type checking
npm run backend:typecheck

# Build for production
npm run backend:build
```

### Or navigate directly into the `backend/` folder:
```powershell
cd backend

# Install dependencies (already installed)
npm.cmd install

# Start development server with live reload (port 3001)
npm.cmd run dev

# Compile TypeScript
npm.cmd run build

# Start production build
npm.cmd run start
```

---

## 🔄 How to Switch from Mock Data to MySQL

When you are ready to connect a real MySQL database:

1. **Install and start MySQL Server** (or use XAMPP / MySQL Workbench).
2. **Execute the Database Scripts**:
   Open MySQL CLI or Workbench and run:
   ```sql
   SOURCE c:/Users/Sarthak/OneDrive/Desktop/TC Managment/backend/database/schema.sql;
   SOURCE c:/Users/Sarthak/OneDrive/Desktop/TC Managment/backend/database/seed.sql;
   ```
3. **Update `.env`**:
   In `backend/.env`, set:
   ```ini
   DB_DRIVER=mysql
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=tc_management_db
   DB_USER=root
   DB_PASSWORD=your_actual_mysql_password
   ```
4. **Restart the backend**:
   ```powershell
   npm run backend:dev
   ```
5. **Verify**:
   The console will output:
   ```
   ✅ [Database] Connected to live MySQL database.
   ```
   If MySQL is temporarily unreachable, the system will log a warning and automatically fall back to the safe Mock Adapter so your demo never crashes!
