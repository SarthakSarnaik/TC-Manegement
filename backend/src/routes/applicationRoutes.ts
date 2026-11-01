import { Router } from 'express';
import {
  getApplications,
  getApplicationById,
  createApplication,
  updateApplicationStatus,
  issueCertificateForApplication,
} from '../controllers/applicationController.js';
import { validateRequest } from '../middleware/validate.js';
import {
  createApplicationSchema,
  updateApplicationStatusSchema,
} from '../validations/applicationValidation.js';

export const applicationRouter = Router();

// GET /api/applications
applicationRouter.get('/', getApplications);

// GET /api/applications/:id
applicationRouter.get('/:id', getApplicationById);

// POST /api/applications
applicationRouter.post('/', validateRequest(createApplicationSchema), createApplication);

// PATCH /api/applications/:id/status
applicationRouter.patch('/:id/status', validateRequest(updateApplicationStatusSchema), updateApplicationStatus);

// POST /api/applications/:id/issue-tc
applicationRouter.post('/:id/issue-tc', issueCertificateForApplication);
