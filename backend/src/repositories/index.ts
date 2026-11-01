import { IRepository } from './IRepository.js';
import { MockRepository } from './MockRepository.js';
import { MySQLRepository } from './MySQLRepository.js';
import { env } from '../config/env.js';
import { testMySQLConnection } from '../config/database.js';

let activeRepo: IRepository | null = null;

export const getRepository = async (): Promise<IRepository> => {
  if (activeRepo) return activeRepo;

  if (env.DB_DRIVER === 'mysql') {
    const test = await testMySQLConnection();
    if (test.connected) {
      console.log('✅ [Database] Connected to live MySQL database.');
      activeRepo = new MySQLRepository();
      return activeRepo;
    } else {
      console.warn(`⚠️ [Database] ${test.message}`);
      console.log('🔄 [Database] Falling back to Mock Database Adapter.');
      activeRepo = new MockRepository();
      return activeRepo;
    }
  }

  console.log('ℹ️ [Database] Running with in-memory Mock Database Adapter (DB_DRIVER=mock).');
  activeRepo = new MockRepository();
  return activeRepo;
};
