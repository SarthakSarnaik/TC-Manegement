import { getRepository } from '../repositories/index.js';
import {
  TCApplication,
  CreateApplicationDTO,
  UpdateApplicationStatusDTO,
} from '../types/index.js';
import { AppError } from '../middleware/errorHandler.js';

export const getApplicationsService = async (filters?: {
  status?: string;
  department?: string;
  search?: string;
}): Promise<TCApplication[]> => {
  const repo = await getRepository();
  return repo.getApplications(filters);
};

export const getApplicationByIdService = async (id: number): Promise<TCApplication> => {
  const repo = await getRepository();
  const app = await repo.getApplicationById(id);
  if (!app) {
    throw new AppError(`TC Application with ID ${id} not found`, 404);
  }
  return app;
};

export const createApplicationService = async (
  data: CreateApplicationDTO
): Promise<TCApplication> => {
  const repo = await getRepository();
  return repo.createApplication(data);
};

export const updateApplicationStatusService = async (
  id: number,
  data: UpdateApplicationStatusDTO
): Promise<TCApplication> => {
  const repo = await getRepository();
  const updated = await repo.updateApplicationStatus(id, data);
  if (!updated) {
    throw new AppError(`TC Application with ID ${id} not found`, 404);
  }
  return updated;
};
