import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboardController.js';

export const dashboardRouter = Router();

// GET /api/dashboard/stats
dashboardRouter.get('/stats', getDashboardStats);
