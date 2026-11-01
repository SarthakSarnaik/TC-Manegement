import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const timestamp = new Date().toISOString();

  // 1. Zod Validation Error
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));

    res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: formattedErrors,
      timestamp,
    });
    return;
  }

  // 2. Custom AppError
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
      timestamp,
    });
    return;
  }

  // 3. MySQL Duplicate Entry Error
  if (err.code === 'ER_DUP_ENTRY') {
    res.status(409).json({
      success: false,
      error: 'Conflict: A duplicate record already exists.',
      details: err.sqlMessage,
      timestamp,
    });
    return;
  }

  // 4. MySQL Foreign Key Constraint Error
  if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    res.status(400).json({
      success: false,
      error: 'Foreign key constraint failed: Referenced entity not found.',
      details: err.sqlMessage,
      timestamp,
    });
    return;
  }

  // 5. Default Internal Server Error
  console.error('[Unhandled Server Error]', err);
  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    timestamp,
  });
};
