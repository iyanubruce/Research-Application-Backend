import { Router } from 'express';
import * as authRequestHandler from '../request-handlers/admin/auth';
import { loginSchema } from '../../validations/user';

const authRouter = Router();
authRouter.post('/login', loginSchema, authRequestHandler.login);
export default authRouter;
