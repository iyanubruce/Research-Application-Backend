import { NextFunction, RequestHandler, Request, Response } from 'express';
import * as utilities from '../../../helpers/utilities';
import * as userController from '../../../controllers/admin/user';
import { Pagination } from '../../middlewares/paginate';

export const getAllUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { limit, page, url }: Pagination = res.locals.paginate;

    const { users, fileContent } = await userController.getAllUsers(req.query, res.locals.paginate, res.locals.user);

    if (req.query.format) {
      utilities.exportResponse(res, req.query.format as string, fileContent!);
      return;
    }
    const responseData = utilities.pagingResponse(users!.rows, users!.count, page, limit, url);
    res.json(utilities.itemResponse(responseData, 'Users retrieved successfully.'));
    return;
  } catch (error) {
    next(error);
  }
};
