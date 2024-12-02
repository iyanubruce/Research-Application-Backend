import { Router } from 'express';
import { UserRole } from '../../constants/user';
import { restrictTo } from '../middlewares/restrict-to';
import authenticate from '../middlewares/user-auth';
import * as userRequestHandler from '../request-handlers/admin/user';
import paginate from '../middlewares/paginate';
import { adminUpdateUserSchema, getAllUsersCountSchema, getAllUsersSchema, userParamsSchema } from '../../validations/user';

const userRouter = Router();
userRouter.use(authenticate(true));
userRouter.use(restrictTo(UserRole.Admin));

userRouter.get('/', getAllUsersSchema, paginate(), userRequestHandler.getAllUsers);
