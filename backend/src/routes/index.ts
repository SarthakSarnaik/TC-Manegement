import { Router } from 'express';
import { healthRouter } from './healthRoutes.js';
import { dashboardRouter } from './dashboardRoutes.js';
import { studentRouter } from './studentRoutes.js';
import { applicationRouter } from './applicationRoutes.js';
import { certificateRouter } from './certificateRoutes.js';
import { departmentRouter } from './departmentRoutes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/dashboard', dashboardRouter);
apiRouter.use('/students', studentRouter);
apiRouter.use('/applications', applicationRouter);
apiRouter.use('/certificates', certificateRouter);
apiRouter.use('/departments', departmentRouter);
