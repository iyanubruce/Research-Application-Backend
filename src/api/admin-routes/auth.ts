import { Router } from 'express';
import * as authRequestHandler from '../request-handlers/admin/auth';
import { completeTwoFactorLoginSchema, loginSchema } from '../../validations/user';

const authRouter = Router();
authRouter.post('/login', loginSchema, authRequestHandler.login);
// authRouter.post('/complete-two-factor-login', completeTwoFactorLoginSchema, authRequestHandler.completeTwoFactorLogin);
export default authRouter;
