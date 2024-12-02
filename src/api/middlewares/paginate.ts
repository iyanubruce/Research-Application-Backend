import { RequestHandler } from 'express';
import envs from '../../config/env';

export interface Pagination {
  page: number;
  limit: number;
  hasPreviousPages: boolean;
  skip: number;
  offset: number;
  url: string;
}

const paginate =
  (defaultLimit = 10, maxLimit = 50): RequestHandler =>
  (req, res, next): any => {
    res.locals.paginate = {} as Pagination;

    let page = 1;
    let limit = defaultLimit;

    if (req.query.page !== undefined) {
      page = parseInt(req.query.page as string, 10) || 1;
    }

    if (req.query.limit !== undefined) {
      limit = parseInt(req.query.limit as string, 10) || defaultLimit;
    }

    if (limit > maxLimit) {
      limit = maxLimit;
    }

    if (page < 1) {
      page = 1;
    }

    if (limit < 0) {
      limit = defaultLimit;
    }

    res.locals.paginate = {
      page,
      limit,
      hasPreviousPages: page > 1,
      skip: (page - 1) * limit,
      offset: (page - 1) * limit,
      url: `${envs.application.baseUrl}${req.originalUrl}`
    };

    next();
  };

export default paginate;
