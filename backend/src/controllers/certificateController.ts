import { Request, Response, NextFunction } from 'express';
import {
  getCertificatesService,
  getCertificateByIdService,
} from '../services/certificateService.js';

export const getCertificates = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { search } = req.query;
    const certificates = await getCertificatesService(search as string);

    res.status(200).json({
      success: true,
      count: certificates.length,
      data: certificates,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getCertificateById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const cert = await getCertificateByIdService(id);

    res.status(200).json({
      success: true,
      data: cert,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
