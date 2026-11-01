import { Request, Response, NextFunction } from 'express';
import { getDepartmentsService } from '../services/departmentService.js';

export const getDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const departments = await getDepartmentsService();

    res.status(200).json({
      success: true,
      count: departments.length,
      data: departments,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
