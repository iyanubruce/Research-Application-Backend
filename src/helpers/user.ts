import { GetAllUsersQuery } from '../interfaces/user';
import User, { UserAttributes } from '../database/models/user';

export const parseWhereQueryForGetAllUsers = (data: GetAllUsersQuery): { [key: string]: any } => {
  const { dateFrom, status, dateTo, email, username } = data;
  return {
    ...(status && { status }),
    ...(username && { username }),
    ...(email && { email }),
    ...(dateFrom && {
      created_at: {
        $gte: new Date(dateFrom),
        ...(dateTo && { $lte: new Date(dateTo) })
      }
    })
  };
};

export const parseWhereQueryForGetUserCount = (data: GetAllUsersQuery): { [key: string]: any } => {
  const { dateFrom, status, dateTo } = data;
  return {
    ...(status && { status }),
    ...(dateFrom && {
      created_at: {
        $gte: new Date(dateFrom),
        ...(dateTo && { $lte: new Date(dateTo) })
      }
    })
  };
};

export const formatUserDataForExport = (users: UserAttributes[], fieldsToExport: string[]): { [key: string]: any }[] => {
  return users.map((user: { [key: string]: any }) => {
    const formattedUser: { [key: string]: any } = {};

    fieldsToExport.forEach((field) => {
      formattedUser[field] = user[field] || '';
    });

    return formattedUser;
  });
};
