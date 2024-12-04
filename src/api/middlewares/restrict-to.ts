import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../../errors';

export function restrictTo(...roles: string[]): any {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!roles.includes(res.locals.user.role)) {
      throw new NotAuthorizedError('You are not authorized to perform this action');
    }
    next();
  };
}
