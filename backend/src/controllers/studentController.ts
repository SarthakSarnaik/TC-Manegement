import { Request, Response, NextFunction } from 'express';
import {
  getStudentsService,
  getStudentByIdService,
  getStudentByRollNoService,
} from '../services/studentService.js';

export const getStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { department, status, search } = req.query;
    const students = await getStudentsService({
      department: department as string,
      status: status as string,
      search: search as string,
    });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const student = await getStudentByIdService(id);

    res.status(200).json({
      success: true,
      data: student,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentByRollNo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const student = await getStudentByRollNoService(req.params.rollNo as string);

    res.status(200).json({
      success: true,
      data: student,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
