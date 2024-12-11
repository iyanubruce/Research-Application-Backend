import { Router } from 'express';

import authRouter from './auth';
import userRouter from './users';

const adminRouter = Router();

adminRouter.use('/auth', authRouter);
adminRouter.use('/users', userRouter);

export default adminRouter;
