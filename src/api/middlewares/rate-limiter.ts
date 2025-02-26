import rateLimit from 'express-rate-limit';
import logger from '../../utils/logger';

/**
 * Function to create a rate limiter middleware
 * @param {number} windowMs - The time frame for which requests are checked/remembered
 * @param {number} max - The maximum number of requests allowed per windowMs
 * @param {Function} keyGenerator - Function to generate a unique key for each request
 * @returns {Function} - Express middleware function
 */
export const rateLimiter = (windowMs: number, max: number, keyGenerator: (req: any) => string) => {
  return rateLimit({
    windowMs,
    max,
    message: 'Too many requests, please try again later.',
    keyGenerator
  });
};

export const getClientIp = (req: any) => {
  const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0] : req.socket.remoteAddress || req.ip;
  logger.info(`Client IP: ${ip}`);
  return ip;
};
