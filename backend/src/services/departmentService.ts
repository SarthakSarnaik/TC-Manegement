import { getRepository } from '../repositories/index.js';
import { Department } from '../types/index.js';

export const getDepartmentsService = async (): Promise<Department[]> => {
  const repo = await getRepository();
  return repo.getDepartments();
};
