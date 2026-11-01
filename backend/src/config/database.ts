import mysql, { Pool } from 'mysql2/promise';
import { env } from './env.js';

let pool: Pool | null = null;

export const getMySQLPool = (): Pool => {
  if (!pool) {
    pool = mysql.createPool({
      host: env.DB_HOST,
      port: env.DB_PORT,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      waitForConnections: true,
      connectionLimit: env.DB_CONNECTION_LIMIT,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
};

export const testMySQLConnection = async (): Promise<{ connected: boolean; message: string }> => {
  try {
    const p = getMySQLPool();
    const connection = await p.getConnection();
    await connection.ping();
    connection.release();
    return { connected: true, message: 'MySQL connection established successfully.' };
  } catch (error: any) {
    return {
      connected: false,
      message: `MySQL not available: ${error.message || 'Connection refused'}. Running in Mock Database Adapter mode.`,
    };
  }
};
