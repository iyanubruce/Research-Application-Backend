import HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { isCelebrateError } from 'celebrate';
import * as Sentry from '@sentry/node';
import env from '../../config/env';
import { errResponse } from '../../utils/response';
import logger from '../../utils/logger';
import ErrorHandler from '../../errors/errorHandler';
import { TokenExpiredError } from 'jsonwebtoken';

export default function handleErrors(err: Error, req: Request, res: Response, next: NextFunction): Response {
  if (env.application.nodeEnv === 'production') {
    Sentry.captureException(err);
  }
  if (err instanceof ErrorHandler) {
    logger.error('HANDLED ERROR ==> ', err);

    return errResponse<string>(res, err.message, err.getHttpCode());
  }

  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body') || err.details.get('query') || err.details.get('params') || { details: [] };

    const errors = errorBody.details.reduce((acc: { [key: string]: any }, val: { [key: string]: any }) => {
      const key = val.path.join('.');
      const message = val.message.replace(/['"]+/g, '');
      acc[key] = { message };
      return acc;
    }, {});

    logger.error('VALIDATION ERROR ==> ', errors);

    return errResponse<string>(res, 'Bad request. Please check your inputs', HttpStatus.BAD_REQUEST, errors);
  }

  if (err instanceof TokenExpiredError) {
    return errResponse<string>(res, 'Invalid token or code provided', 403);
  }

  logger.error('Internal Error --> ', err);

  return errResponse<string>(res, 'Internal server error, please report this to the support team', 500);
}
