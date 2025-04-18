import { RequestHandler } from 'express';
import * as authController from '../../../controllers/admin/auth';
import * as utilities from '../../../helpers/utilities';

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { user, accessToken, message } = await authController.login(req.body);

    const responsePayload = {
      ...(accessToken && { tokenType: 'Bearer' }),
      accessToken: accessToken,
      user: {
        id: user._id,
        email: user.email,
        status: user.status,
        username: user.username
      }
    };
    res.json(utilities.itemResponse(responsePayload, message));
    return;
  } catch (error) {
    next(error);
  }
};
