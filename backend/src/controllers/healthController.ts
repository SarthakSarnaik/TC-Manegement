import { Request, Response, NextFunction } from 'express';
import { getHealthStatus } from '../services/healthService.js';

export const getHealth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const health = await getHealthStatus();
    res.status(200).json({
      success: true,
      data: health,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
