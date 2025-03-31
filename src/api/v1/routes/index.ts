import { Router } from 'express';

import authRouter from './auth';
import projectRouter from './project';
import documentRouter from './document';
import authenticate from '../../middlewares/user-auth';
import { rateLimiter } from '../../middlewares/rate-limiter';
import { getClientIp } from '../../middlewares/rate-limiter';
const userRouter = Router();

userRouter.use('/auth', authRouter);
userRouter.use('/project', projectRouter);
userRouter.use('/document', documentRouter);

export default userRouter;
