import { getRepository } from '../repositories/index.js';
import { Student } from '../types/index.js';
import { AppError } from '../middleware/errorHandler.js';

export const getStudentsService = async (filters?: {
  department?: string;
  status?: string;
  search?: string;
}): Promise<Student[]> => {
  const repo = await getRepository();
  return repo.getStudents(filters);
};

export const getStudentByIdService = async (id: number): Promise<Student> => {
  const repo = await getRepository();
  const student = await repo.getStudentById(id);
  if (!student) {
    throw new AppError(`Student with ID ${id} not found`, 404);
  }
  return student;
};

export const getStudentByRollNoService = async (rollNo: string): Promise<Student> => {
  const repo = await getRepository();
  const student = await repo.getStudentByRollNo(rollNo);
  if (!student) {
    throw new AppError(`Student with Roll Number '${rollNo}' not found`, 404);
  }
  return student;
};
