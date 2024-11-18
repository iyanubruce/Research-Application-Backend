import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// import * as Sentry from '@sentry/node';
// import { nodeProfilingIntegration } from '@sentry/profiling-node';
import env from './config/env';
// Sentry.init({
//   dsn: env.application.sentryDsn,
//   integrations: [nodeProfilingIntegration()],
//   tracesSampleRate: 1.0,
//   profilesSampleRate: 1.0
// });
import customErrorMiddleware from './api/middlewares/custom-error';
import logger from './utils/logger';
import connectDB from './config/database';
import cors from 'cors';
import Redis from 'ioredis';
import { init as initializeRedis } from './utils/redis';

initializeRedis(new Redis(env.redis));

const app = express();
const PORT = env.application.port;
app.get('/', (req, res) => {
  res.send('welcome to My study application backend');
});
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// app.use(customErrorMiddleware);

export default async function start() {
  await connectDB();
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
}
