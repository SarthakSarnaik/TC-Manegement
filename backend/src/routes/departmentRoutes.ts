import { Router } from 'express';
import { getDepartments } from '../controllers/departmentController.js';

export const departmentRouter = Router();

// GET /api/departments
departmentRouter.get('/', getDepartments);
