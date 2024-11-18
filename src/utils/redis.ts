import logger from './logger';

let client: any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let isConnected = false;

export const init = async (redisClient: any): Promise<any> => {
  client = redisClient;

  client.on('connect', (): any => {
    isConnected = true;
    logger.info('REDIS CLIENT Connected');
  });

  client.on('error', (err: any): any => {
    isConnected = false;
    if (err.message.includes('WRONGPASS')) {
      logger.error(`[REDIS AUTHENTICATION ERROR] ==> ${err}`);
      client.disconnect();
      process.exit(1);
    } else {
      logger.info(`[REDIS CONNECTION ERROR] ==> ${err}`);
    }
  });

  client.on('end', (): any => {
    isConnected = false;
    logger.info('REDIS CLIENT Disconnected');
  });

  try {
    await client.ping();
    logger.info('REDIS CLIENT Authenticated');
  } catch (err) {
    logger.error(`[REDIS AUTHENTICATION ERROR] ==> ${err}`);
    client.disconnect();
    process.exit(1);
  }
};

export const get = async (key: string): Promise<any> => {
  try {
    const response = await client.get(key);
    return response;
  } catch (error) {
    return null;
  }
};

export const set = async (key: string, value: any, expiryInSeconds: number | null = null): Promise<any> => {
  const setValue = await client.set(key, value);
  if (expiryInSeconds) {
    client.expire(key, expiryInSeconds);
  }

  return setValue;
};
