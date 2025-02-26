import { Router } from 'express';
import { createUserSchema, loginSchema } from '../../../validations/user';
import * as AuthRequestHandler from '../../request-handlers/auth';
import { getClientIp, rateLimiter } from '../../middlewares/rate-limiter';

const authRouter = Router();

authRouter.post('/signup', createUserSchema, AuthRequestHandler.signup);
authRouter.post(
  '/login',
  rateLimiter(2 * 60 * 60 * 1000, 7, (req) => getClientIp(req)),
  loginSchema,
  AuthRequestHandler.login
);
export default authRouter;
