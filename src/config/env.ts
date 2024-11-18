import * as dotenv from 'dotenv';

dotenv.config();

export default {
  application: {
    nodeEnv: process.env.NODE_ENV?.toLowerCase() || 'development',
    port: process.env.PORT || 3500,
    database: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret==',
    expiresIn: process.env.JWT_EXPIRES_IN || '2h'
  },
  redis: {
    url: process.env.REDIS_URL || '',
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || '',
    maxRetriesPerRequest: null as any,
    enableReadyCheck: false
  }
};
