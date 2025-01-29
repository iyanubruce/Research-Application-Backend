import { Router } from 'express';

import authRouter from './auth';

const userRouter = Router();

userRouter.use('/auth', authRouter);

export default userRouter;
