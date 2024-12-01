import { RequestHandler } from 'express';
import * as authController from '../../controllers/auth';
import * as utilities from '../../helpers/utilities';

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const user = await authController.signup(req.body);

    res.json(utilities.itemResponse({ username: user.username, email: user.email }, 'User created successfully'));
    return;
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { user, accessToken, message } = await authController.login(req.body);
    const responsePayload = {
      ...(accessToken && { tokenType: 'Bearer' }),
      accessToken: accessToken,
      user: {
        id: user.id,
        email: user.email,
        status: user.status,
        username: user.username,
        works: user.works
      }
    };
    res.json(utilities.itemResponse(responsePayload, message));
    return;
  } catch (error) {
    next(error);
  }
};
