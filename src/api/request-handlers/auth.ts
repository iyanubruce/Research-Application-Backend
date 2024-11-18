import { RequestHandler } from 'express';
import * as authController from '../../controllers/auth';
import * as utilities from '../../helpers/utilities';

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const user = await authController.signup(req.body);

    return res.json(
      utilities.itemResponse({ id: user.id, email: user.email }, 'A verification token has been sent to your email address')
    );
  } catch (error) {
    next(error);
  }
};
