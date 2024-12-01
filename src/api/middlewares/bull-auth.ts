import { Request, Response, NextFunction } from 'express';

import { NotAuthenticatedError } from '../../errors';
import config from '../../config/env';

const bullAuthenticate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Login Required"');
        throw new NotAuthenticatedError('Session does not exist');
      }

      const base64Credentials = req.headers.authorization.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [username, password] = credentials.split(':');

      if (!username || !password) {
        throw new NotAuthenticatedError('Invalid session');
      }

      if (username !== config.application.bullUsername || password !== config.application.bullPassword) {
        throw new NotAuthenticatedError('Invalid session');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

export default bullAuthenticate;
