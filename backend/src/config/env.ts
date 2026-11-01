import dotenv from 'dotenv';
import path from 'path';

// Load .env from backend directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '3001', 10),
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  DB_DRIVER: (process.env.DB_DRIVER || 'mock') as 'mock' | 'mysql',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || '3306', 10),
  DB_NAME: process.env.DB_NAME || 'tc_management_db',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_CONNECTION_LIMIT: parseInt(process.env.DB_CONNECTION_LIMIT || '10', 10),
};
