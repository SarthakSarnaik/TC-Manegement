import { getRepository } from '../repositories/index.js';
import { IssuedCertificate } from '../types/index.js';
import { AppError } from '../middleware/errorHandler.js';

export const getCertificatesService = async (search?: string): Promise<IssuedCertificate[]> => {
  const repo = await getRepository();
  return repo.getCertificates(search);
};

export const getCertificateByIdService = async (id: number): Promise<IssuedCertificate> => {
  const repo = await getRepository();
  const cert = await repo.getCertificateById(id);
  if (!cert) {
    throw new AppError(`Transfer Certificate with ID ${id} not found`, 404);
  }
  return cert;
};

export const issueCertificateService = async (
  applicationId: number,
  issuerInfo?: { preparedBy?: string; verifiedBy?: string; principalName?: string }
): Promise<IssuedCertificate> => {
  const repo = await getRepository();
  return repo.issueCertificate(applicationId, issuerInfo);
};
