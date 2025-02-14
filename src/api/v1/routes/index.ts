import { Router } from 'express';

import authRouter from './auth';
import projectRouter from './project';

const userRouter = Router();

userRouter.use('/auth', authRouter);
userRouter.use('/project', projectRouter);

export default userRouter;
