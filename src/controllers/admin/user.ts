import { GetAllUsersQuery, GetUserCountQuery } from '../../interfaces/user';
import { Pagination } from '../../api/middlewares/paginate';
import { UserAttributes } from '../../database/models/user';
import * as userHelper from '../../helpers/user';
import { formatUserDataForExport } from '../../helpers/user';
import { findAndCountAllUsers, countUsers, findUser } from '../../database/repositories/user';
import { generateExport } from '../../utils/excel';
import { ResourceNotFoundError } from '../../errors';
import { updateUser as updateUserRepo } from '../../database/repositories/user';
import { UserStatus } from '../../constants/user';

export async function getAllUsers(
  validatedData: GetAllUsersQuery,
  pagination: Pagination,
  admin: UserAttributes
): Promise<{ users?: { rows: UserAttributes[]; count: number }; fileContent?: Buffer }> {
  const { limit, offset } = pagination;
  const exportData = !!validatedData.format;

  const where = userHelper.parseWhereQueryForGetAllUsers(validatedData);
  const fieldsToExport = validatedData.fieldsToExport || ['email', 'username', 'phone', 'dob', 'avatar', 'status', 'last_login'];

  const users = await findAndCountAllUsers({
    data: where,
    ...(limit && !validatedData.format && { limit }),
    ...(offset && !validatedData.format && { offset })
  });

  if (!validatedData.format) {
    return { users };
  }
  const usersData = formatUserDataForExport(users.rows, fieldsToExport);

  const fileContent = await generateExport(usersData, fieldsToExport, validatedData.format);

  // emitter.emit(LISTENERS.AUDIT_LOG, {
  //   event: AuditLogEvents.Export,
  //   description: `${admin.username} (${admin.email}) exported users`,
  //   actor: AuditLogActor.Admin,
  //   actor_id: admin.id,
  //   reference: getUniqueID(ReferencePrefix.AuditLog)
  // });
  return { fileContent };
}

export async function getUserCount(validatedData: GetUserCountQuery): Promise<number> {
  const where = userHelper.parseWhereQueryForGetUserCount(validatedData);
  const userCount = await countUsers({
    data: where
  });
  return userCount;
}

export async function updateUser(_id: string, status: UserStatus, admin: UserAttributes): Promise<any> {
  const user = await findUser({ filter: { _id } });
  if (!user) throw new ResourceNotFoundError('User not found');
  await updateUserRepo(user._id, {
    status
  });

  // emitter.emit(LISTENERS.AUDIT_LOG, {
  //   event: AuditLogEvents.SetUserStatus,
  //   // eslint-disable-next-line max-len
  //   description: `${admin.first_name} ${admin.last_name} (${admin.email}) updated ${user.first_name} ${user.last_name} with user id ${user.id} to ${status}`,
  //   actor: AuditLogActor.Admin,
  //   actor_id: admin.id,
  //   target: true,
  //   targetId: user.id,
  //   reference: getUniqueID(ReferencePrefix.AuditLog)
  // });
}

export async function getUser(_id: string): Promise<{ user: UserAttributes }> {
  const user = await findUser({
    filter: { _id }
  });
  if (!user) throw new ResourceNotFoundError('User not found');
  return { user };
}
