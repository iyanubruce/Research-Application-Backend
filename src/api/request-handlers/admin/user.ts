import { RequestHandler } from 'express';
import * as utilities from '../../../helpers/utilities';
import * as userController from '../../../controllers/admin/user';
import { Pagination } from '../../middlewares/paginate';

import * as userController from '../../../controllers/admin/user';

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const { limit, page, url }: Pagination = res.locals.paginate;

    const { users, fileContent } = await userController.getAllUsers(req.query, res.locals.paginate, res.locals.user);

    if (req.query.format) {
      return utilities.exportResponse(res, req.query.format as string, fileContent!);
    }
    const responseData = utilities.pagingResponse(users!.rows, users!.count, page, limit, url);

    return res.json(utilities.itemResponse(responseData, 'Users retrieved successfully.'));
  } catch (error) {
    next(error);
  }
};
