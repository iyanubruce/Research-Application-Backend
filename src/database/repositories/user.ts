import User, { IUser } from '../models/user';

/**
 * Find an existing user by email or phone.
 * @param data - An object containing email and phone to search for.
 * @returns The user document or null if not found.
 */
export const findExistingUser = async (data: { email: string; username: string }): Promise<IUser | null> =>
  User.findOne({
    $or: [{ email: data.email }, { phone: data.username }]
  });
