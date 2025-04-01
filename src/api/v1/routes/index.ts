import { Router } from 'express';

import authRouter from './auth';
import projectRouter from './project';
import documentRouter from './document';

const userRouter = Router();

userRouter.use('/auth', authRouter);
userRouter.use('/project', projectRouter);
userRouter.use('/document', documentRouter);

export default userRouter;
