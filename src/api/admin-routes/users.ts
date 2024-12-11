import { Router } from 'express';
import { UserRole } from '../../constants/user';
import { restrictTo } from '../middlewares/restrict-to';
import authenticate from '../middlewares/user-auth';
import * as userRequestHandler from '../request-handlers/admin/user';
import paginate from '../middlewares/paginate';
import { getAllUsersSchema, getAllUsersCountSchema, userParamsSchema, adminUpdateUserSchema } from '../../validations/user';

const userRouter = Router();
userRouter.use(authenticate(true));
userRouter.use(restrictTo(true));

userRouter.get('/', getAllUsersSchema, paginate(), userRequestHandler.getAllUsers);
userRouter.get('/count', getAllUsersCountSchema, userRequestHandler.getUserCount);
userRouter.patch('/:id', userParamsSchema, adminUpdateUserSchema, userRequestHandler.updateUser);
userRouter.get('/:id', userParamsSchema, userRequestHandler.getUser);

export default userRouter;
