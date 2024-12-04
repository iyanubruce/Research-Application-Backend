import { GetAllUsersQuery, GetUserCountQuery } from '../../interfaces/user';
import { Pagination } from '../../api/middlewares/paginate';
import { UserAttributes } from '../../database/models/user';
import * as userHelper from '../../helpers/user';
import { formatUserDataForExport } from '../../helpers/user';
import { findAndCountAllUsers } from '../../database/repositories/user';
import { generateExport } from '../../utils/excel';

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
