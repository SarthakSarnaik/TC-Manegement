# Transfer Certificate (TC) Management System

A comprehensive College Transfer Certificate (TC) Management System featuring an interactive React + Vite frontend and a type-safe Node.js / Express / TypeScript backend with MySQL integration.

---

## 🚀 Overview

The **Transfer Certificate (TC) Management System** streamlines and digitizes the application, clearance, verification, and issuance process for student transfer certificates in college institutions.

### ✨ Key Features
- **Student TC Application Workflow**: Submit, track, and process student TC requests.
- **Multi-Department Clearance**: Real-time clearance tracking across Library, Accounts/Finance, Sports, and Academic departments.
- **Administrative Dashboard**: Analytics on pending, approved, and rejected applications with visual trends and department breakdowns.
- **Certificate Generation**: Secure certificate verification and generation.
- **Dual-Mode Backend Architecture**: Seamlessly switch between an in-memory **Mock Repository** (for zero-setup evaluation) and a live **MySQL Database Pool** via environment configuration.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript (with `tsx` for live reload)
- **Database**: MySQL (with `mysql2` connection pooling)
- **Validation**: Zod
- **Architecture**: Repository Pattern with Layered Architecture (Routes, Controllers, Services, Repositories)

---

## 📁 Project Structure

```
TC Managment/
├── src/                         # Frontend React source code
│   ├── components/              # UI components (dashboard, applications, certificates, etc.)
│   ├── data/                    # Mock datasets
│   ├── types/                   # Frontend TypeScript interfaces
│   ├── App.tsx                  # Root application component
│   └── main.tsx                 # Frontend entry point
├── backend/                     # Backend API server
│   ├── database/                # SQL schema & seed scripts
│   │   ├── schema.sql           # DDL schema definitions
│   │   └── seed.sql             # Sample data seed script
│   ├── src/                     # Backend source code
│   │   ├── config/              # Configuration & database connection
│   │   ├── controllers/         # HTTP request/response handlers
│   │   ├── middleware/          # Validation, logging, error handling
│   │   ├── repositories/        # Mock & MySQL repository adapters
│   │   ├── routes/              # Express API route declarations
│   │   ├── services/            # Business logic
│   │   ├── types/               # Backend data types
│   │   └── validations/         # Zod schemas
│   ├── .env.example             # Environment configuration template
│   ├── package.json             # Backend dependencies & scripts
│   └── README.md                # Backend API documentation
├── index.html                   # Frontend HTML shell
├── package.json                 # Frontend dependencies & root scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── vite.config.ts               # Vite configuration
```

---

## ⚡ Getting Started

### 1. Prerequisites
- **Node.js**: v18+ recommended
- **npm** or **yarn**
- **MySQL Server** *(optional, mock database mode works out of the box)*

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start backend in development mode
npm run dev
```

---

## 📜 License

This project is developed for college academic and management purposes.
