import { Request, Response, NextFunction } from 'express';
import { NotBeforeError, TokenExpiredError } from 'jsonwebtoken';

import { findUser } from '../../database/repositories/user';
import { NotAuthenticatedError, NotAuthorizedError } from '../../errors';
import JWT from '../../helpers/jwt';
import { UserRole, UserStatus } from '../../constants/user';

const authenticate = (admin?: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;

      if (!authorization) {
        throw new NotAuthenticatedError('Not authenticated. Session does not exist');
      }

      const [, token] = authorization.split(' ');

      if (!token) {
        throw new NotAuthenticatedError('Session does not exist');
      }

      const decoded = JWT.decode(token);

      const user = await findUser({
        filter: { id: decoded.id }
      });

      if (!user) {
        throw new NotAuthenticatedError('Invalid session');
      }
      if (user.isAdmin !== true && user.status !== UserStatus.Verified) {
        throw new NotAuthenticatedError(`This account is currently ${user.status} please contact support`);
      }

      res.locals.user = user;

      if (req.params.id && res.locals.user.isAdmin !== true) {
        if (Number(req.params.id) !== Number(res.locals.user.id))
          throw new NotAuthorizedError('You are not authorized to perform this action');
      }

      return next();
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return next(new NotAuthenticatedError('Session has expired, please log in again.'));
      }

      if (error instanceof NotBeforeError) {
        return next(new NotAuthenticatedError('Token used prematurely'));
      }

      next(error);
    }
  };
};

export default authenticate;
