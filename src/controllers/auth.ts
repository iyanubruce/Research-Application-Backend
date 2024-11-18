import bcrypt from 'bcryptjs';
import User, { IUser } from '../database/models/user';
import { findExistingUser } from '../database/repositories/user';
import { UserSignupInput } from '../interfaces/user';
import * as redis from '../utils/redis';
import * as utilities from '../helpers/utilities';

export const signup = async (validatedData: UserSignupInput): Promise<IUser> => {
  const userExists = await findExistingUser({ email: validatedData.email, username: validatedData.username });
  if (userExists && userExists.verifiedEmail === true) {
    throw new Error('User with email or username already exists');
  }

  const redisKey = `verification_token_${validatedData.email}`;

  let verificationToken = await redis.get(redisKey);
  if (!verificationToken) {
    verificationToken = utilities.getRandomString(5, 'alphanumeric', true);
    await redis.set(redisKey, verificationToken, 600);
  }
};
