import { getRepository } from '../repositories/index.js';

export const getHealthStatus = async () => {
  const repo = await getRepository();
  return repo.getHealth();
};
