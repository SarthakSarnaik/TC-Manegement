import { Request, Response, NextFunction } from 'express';
import { getDashboardStatsService } from '../services/dashboardService.js';

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const stats = await getDashboardStatsService();
    res.status(200).json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
