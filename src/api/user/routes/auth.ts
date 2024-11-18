import { Router } from 'express';
import { createUserSchema } from '../../../validations/user';
import * as AuthRequestHandler from '../../request-handlers/auth';

const authRouter = Router();

authRouter.post('/signup', createUserSchema, AuthRequestHandler.signup);

export default authRouter;
