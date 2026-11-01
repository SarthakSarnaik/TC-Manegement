import { createApp } from './app.js';
import { env } from './config/env.js';
import { getRepository } from './repositories/index.js';

const startServer = async () => {
  try {
    console.log('🚀 Initializing College TC Management System Backend...');

    // Warm up repository & verify database connectivity
    await getRepository();

    const app = createApp();

    const server = app.listen(env.PORT, () => {
      console.log(`\n======================================================`);
      console.log(`🎓 TC Management System REST API is LIVE!`);
      console.log(`📡 URL:       http://localhost:${env.PORT}`);
      console.log(`🩺 Health:    http://localhost:${env.PORT}/api/health`);
      console.log(`📊 Stats:     http://localhost:${env.PORT}/api/dashboard/stats`);
      console.log(`👥 Students:  http://localhost:${env.PORT}/api/students`);
      console.log(`📝 TC Apps:   http://localhost:${env.PORT}/api/applications`);
      console.log(`📜 Certs:     http://localhost:${env.PORT}/api/certificates`);
      console.log(`🏢 Depts:     http://localhost:${env.PORT}/api/departments`);
      console.log(`🗄️ Database:  ${env.DB_DRIVER.toUpperCase()} Mode`);
      console.log(`======================================================\n`);
    });

    const shutdown = (signal: string) => {
      console.log(`\n[${signal}] Shutting down server gracefully...`);
      server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('❌ Failed to start backend server:', error);
    process.exit(1);
  }
};

startServer();
