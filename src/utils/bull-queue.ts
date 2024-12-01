import dotenv from 'dotenv';
import * as Sentry from '@sentry/node';

dotenv.config();

import Redis from 'ioredis';
import { createBullBoard } from '@bull-board/api';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import BullQueue, { JobOptions, Queue } from 'bull';

import logger from './logger';
import env from '../config/env';
Sentry.init({
  dsn: env.application.sentryDsn,
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0
});

export const QUEUES = {
  SEND_EMAIL: 'send_email'
};

export const QUEUE_URL_PATH = '/admin-reaserch/queues';

const connectionOptions = env.redis;

let client: Redis;
let subscriber: Redis;

export const queueOptions: BullQueue.QueueOptions = {
  createClient: (type: string): Redis => {
    switch (type) {
      case 'client':
        logger.info('CREATING REDIS CLIENT');
        if (!client) {
          client = new Redis(connectionOptions);
        }
        return client;
      case 'subscriber':
        logger.info('CREATING REDIS SUBSCRIBER');
        if (!subscriber) {
          subscriber = new Redis(connectionOptions);
        }
        return subscriber;
      case 'bclient':
        logger.info('CREATING REDIS BCLIENT');
        return new Redis(connectionOptions);
      default:
        throw new Error(`Unknown redis client type: ${type}`);
    }
  }
};

export const getQueue = (name: string): Queue => {
  return new BullQueue(name, queueOptions);
};

export const bullQueueUI = (): any => {
  const serverAdapter = new ExpressAdapter();
  const queues = Object.values(QUEUES).map((queue) => new BullAdapter(getQueue(queue)));

  createBullBoard({ queues, serverAdapter });

  serverAdapter.setBasePath(QUEUE_URL_PATH);

  return serverAdapter.getRouter();
};

export const pushJobToQueue = async <T>(queue: string, message: T, options?: JobOptions): Promise<void> => {
  if (!Object.values(QUEUES).includes(queue as any)) {
    throw new Error('Queue not found');
  }

  await getQueue(queue).add(message, options);
};
