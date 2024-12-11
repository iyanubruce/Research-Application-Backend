import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../../errors';

export function restrictTo(isAdmin: boolean): any {
  return function (req: Request, res: Response, next: NextFunction) {
    if (res.locals.user.isAdmin !== true) {
      throw new NotAuthorizedError('You are not authorized to perform this action');
    }
    next();
  };
}
