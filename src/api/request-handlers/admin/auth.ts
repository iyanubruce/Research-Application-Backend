import { RequestHandler } from 'express';
import * as authController from '../../../controllers/admin/auth';
export const login: RequestHandler = async (req, res, next) => {
  try {
    const { user, accessToken, message } = await authController.login(req.body);
  } catch (error) {
    next(error);
  }
};
