import bcrypt from 'bcryptjs';
import User, { UserAttributes } from '../database/models/user';
import { findExistingUser, findUser, updateUser, createUser } from '../database/repositories/user';
import { UserSignupInput, UserLoginInput } from '../interfaces/user';
import { UserStatus } from '../constants/user';
import JWT from '../helpers/jwt';
import { BadRequestError, ConflictError, NotAuthorizedError, ResourceNotFoundError } from '../errors';
// import * as redis from '../utils/redis';
// import * as utilities from '../helpers/utilities';

export const signup = async (validatedData: UserSignupInput): Promise<UserAttributes> => {
  const usernameExists = await findExistingUser({ username: validatedData.username });
  const userEmailExists = await findExistingUser({ email: validatedData.email });

  if (usernameExists || userEmailExists) {
    throw new ConflictError('User with email or username already exists');
  }
  const hashedPassword = bcrypt.hashSync(validatedData.password, 10);
  const user = createUser({
    email: validatedData.email.toLocaleLowerCase(),
    password: hashedPassword,
    username: validatedData.username
  });
  return user;
};

export const login = async (
  validatedData: UserLoginInput
): Promise<{ user: UserAttributes; accessToken: string; message: string }> => {
  const user = await findUser({
    filter: { email: validatedData.email.toLocaleLowerCase() }
  });

  if (!user || user.status === UserStatus.Deleted) {
    throw new ResourceNotFoundError('User not found');
  }

  if (validatedData.password) {
    const isPasswordValid = await bcrypt.compare(validatedData.password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestError('Invalid credentials');
    }
  }

  const accessToken = JWT.encode({ id: user.id });

  await updateUser(user.id, { lastLogin: new Date() });

  return {
    user,
    accessToken,
    message: 'Login successful'
  };
};
