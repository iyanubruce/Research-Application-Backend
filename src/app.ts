import dotenv from 'dotenv';
dotenv.config();
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import env from './config/env';
Sentry.init({
  dsn: env.application.sentryDsn,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0
});
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import Redis from 'ioredis';

import customErrorMiddleware from './api/middlewares/custom-error';
import bullAuth from './api/middlewares/bull-auth';
import { QUEUE_URL_PATH, bullQueueUI } from './utils/bull-queue';

import { init as initializeRedis } from './utils/redis';
import userRouter from './api/user/routes/index';
import adminRouter from './api/admin-routes/index';
initializeRedis(new Redis(env.redis));

const app = express();

Sentry.setupExpressErrorHandler(app);

app.use(cors());
app.use('*', cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

app.get('/', (_req, res) => {
  res.send('welcome to My study application backend');
});
app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use(QUEUE_URL_PATH, bullAuth(), bullQueueUI());

//@ts-ignore
app.use(customErrorMiddleware);

app.use((req, res, _next): void => {
  res.status(404).json({
    status: false,
    message: 'resource not found',
    data: null,
    path: req.url
  });
});

app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction): void => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

export default app;
