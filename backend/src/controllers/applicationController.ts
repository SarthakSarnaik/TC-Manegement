import { Request, Response, NextFunction } from 'express';
import {
  getApplicationsService,
  getApplicationByIdService,
  createApplicationService,
  updateApplicationStatusService,
} from '../services/applicationService.js';
import { issueCertificateService } from '../services/certificateService.js';

export const getApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { status, department, search } = req.query;
    const applications = await getApplicationsService({
      status: status as string,
      department: department as string,
      search: search as string,
    });

    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const application = await getApplicationByIdService(id);

    res.status(200).json({
      success: true,
      data: application,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const createApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newApp = await createApplicationService(req.body);

    res.status(201).json({
      success: true,
      message: 'TC Application created successfully.',
      data: newApp,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const updated = await updateApplicationStatusService(id, req.body);

    res.status(200).json({
      success: true,
      message: `TC Application status updated to ${updated.status}.`,
      data: updated,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const issueCertificateForApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const cert = await issueCertificateService(id, req.body);

    res.status(201).json({
      success: true,
      message: 'Official Transfer Certificate issued successfully.',
      data: cert,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
