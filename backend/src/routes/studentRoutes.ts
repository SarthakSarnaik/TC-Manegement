import { Router } from 'express';
import {
  getStudents,
  getStudentById,
  getStudentByRollNo,
} from '../controllers/studentController.js';

export const studentRouter = Router();

// GET /api/students
studentRouter.get('/', getStudents);

// GET /api/students/:id
studentRouter.get('/:id', getStudentById);

// GET /api/students/roll/:rollNo
studentRouter.get('/roll/:rollNo', getStudentByRollNo);
