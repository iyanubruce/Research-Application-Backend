import User, { UserAttributes } from '../models/user';
import mongoose, { ClientSession, FilterQuery, ProjectionType, PopulateOptions } from 'mongoose';
import bcrypt from 'bcryptjs'; // Assuming you have a Mongoose model for User

/**
 * Find an existing user by email or phone.
 * @param data - An object containing email and phone to search for.
 * @returns The user document or null if not found.
 */

interface FindUserOptions<T> {
  filter: FilterQuery<T>;
  projection?: ProjectionType<T>;
  populate?: string | PopulateOptions | Array<string | PopulateOptions>;
  session?: ClientSession;
  lean?: boolean; // Return plain JavaScript objects for better performance
}

export const findExistingUser = async (
  data: { email: string; username: string },
  session?: ClientSession
): Promise<UserAttributes | null> => {
  return User.findOne(
    {
      $or: [{ email: data.email }, { phone: data.username }]
    },
    null,
    { session }
  );
};

export const createUser = async (user: UserAttributes, session?: ClientSession): Promise<UserAttributes> => {
  const newUser = new User({ user });

  if (session) {
    await newUser.save({ session });
  } else {
    await newUser.save();
  }

  return newUser;
};

export const updateUser = async (
  id: string,
  user: Partial<UserAttributes>,
  session?: any // Replace `any` with `ClientSession` if using Mongoose with TypeScript
): Promise<void> => {
  const updatedData: Partial<UserAttributes> = { ...user };

  if (updatedData.password) {
    const hash = await bcrypt.hash(String(updatedData.password), 10);
    updatedData.password = hash;
  }

  await User.updateOne(
    { _id: id }, // MongoDB uses `_id` as the default identifier field
    { $set: updatedData },
    session ? { session } : {}
  );
};

export async function findUser<T extends UserAttributes>({
  filter,
  projection,
  populate,
  session,
  lean = true
}: FindUserOptions<T>): Promise<T | null> {
  const query = User.findOne(filter);

  if (projection) {
    query.select(projection as string | string[] | Record<string, string | number | boolean | object>);
  }

  if (populate) {
    if (typeof populate === 'string') {
      query.populate(populate);
    } else {
      query.populate(populate as PopulateOptions | (string | PopulateOptions)[]);
    }
  }

  if (session) {
    query.session(session); // Transactional support
  }

  if (lean) {
    query.lean(); // Optimize by returning plain objects
  }

  return query.exec() as Promise<T | null>; // Execute the query and cast the result
}
