import { Router } from 'express';
import { createUserSchema, loginSchema } from '../../../validations/user';
import * as AuthRequestHandler from '../../request-handlers/auth';

const authRouter = Router();

authRouter.post('/signup', createUserSchema, AuthRequestHandler.signup);
authRouter.post('/login', loginSchema, AuthRequestHandler.login);
export default authRouter;
