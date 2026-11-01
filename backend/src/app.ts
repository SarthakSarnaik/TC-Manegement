import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { requestLogger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFoundHandler } from './middleware/notFound.js';

export const createApp = (): Application => {
  const app = express();

  // 1. Cross-Origin Resource Sharing
  app.use(
    cors({
      origin: [env.CORS_ORIGIN, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
      credentials: true,
    })
  );

  // 2. Request body parsers
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));

  // 3. Logger
  app.use(requestLogger);

  // 4. Root information endpoint
  app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
      name: 'College TC Management System REST API',
      version: '1.0.0',
      status: 'operational',
      environment: env.NODE_ENV,
      databaseDriver: env.DB_DRIVER,
      documentation: '/api/health',
      endpoints: [
        'GET /api/health',
        'GET /api/dashboard/stats',
        'GET /api/students',
        'GET /api/applications',
        'POST /api/applications',
        'PATCH /api/applications/:id/status',
        'POST /api/applications/:id/issue-tc',
        'GET /api/certificates',
        'GET /api/departments',
      ],
      timestamp: new Date().toISOString(),
    });
  });

  // 5. Mount API Routes
  app.use('/api', apiRouter);

  // 6. 404 Not Found Handler
  app.use(notFoundHandler);

  // 7. Centralized Error Handler
  app.use(errorHandler);

  return app;
};
