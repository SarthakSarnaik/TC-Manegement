import { Router } from 'express';
import {
  getCertificates,
  getCertificateById,
} from '../controllers/certificateController.js';

export const certificateRouter = Router();

// GET /api/certificates
certificateRouter.get('/', getCertificates);

// GET /api/certificates/:id
certificateRouter.get('/:id', getCertificateById);
