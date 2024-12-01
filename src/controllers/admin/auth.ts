import { UserStatus } from '../../constants/user';
import { findUser, updateUser } from '../../database/repositories/user';
import { ResourceNotFoundError, BadRequestError } from '../../errors';
import JWT from '../../helpers/jwt';
import { UserAttributes } from '../../database/models/user';
import { UserLoginInput } from '../../interfaces/user';
import bcrypt from 'bcryptjs';

export const login = async (
  validatedData: UserLoginInput
): Promise<{ user: UserAttributes; accessToken: string; message: string }> => {
  const user = await findUser({
    filter: { email: validatedData.email }
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

  await updateUser(user.id, { lastLogin: new Date() });
  const accessToken = JWT.encode({ id: user.id });

  return {
    user,
    accessToken,
    message: 'Login successful'
  };
};
