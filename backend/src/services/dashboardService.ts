import { getRepository } from '../repositories/index.js';
import { DashboardStats } from '../types/index.js';

export const getDashboardStatsService = async (): Promise<DashboardStats> => {
  const repo = await getRepository();
  return repo.getDashboardStats();
};
