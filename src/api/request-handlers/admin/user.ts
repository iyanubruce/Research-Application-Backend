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

export const getUserCount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userCount = await userController.getUserCount(req.query);

    res.json(utilities.itemResponse({ count: userCount }, 'User count retrieved successfully.'));
    return;
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await userController.updateUser(req.params.id, req.body.status, res.locals.user);

    res.json(utilities.itemResponse(null, 'User updated successfully.'));
    return;
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = await userController.getUser(req.params.id);

    res.json(utilities.itemResponse(user, 'User retrieved successfully.'));
    return;
  } catch (error) {
    next(error);
  }
};
