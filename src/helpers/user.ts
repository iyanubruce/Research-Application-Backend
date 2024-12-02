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

export const parseIncludeQueryForGetAllUsers = (forReportExport: boolean): { [key: string]: any }[] => {
  return [
    ...(forReportExport
      ? [
          {
            model: BankAccount,
            as: 'bank_accounts',
            attributes: ['bank_name', 'account_number'],
            where: {
              default: true
            },
            required: false
          }
        ]
      : [])
  ];
};

export const formatUserDataForExport = (users: UserAttributes[], fieldsToExport: string[]): { [key: string]: any }[] => {
  return users.map((user: { [key: string]: any }) => {
    const formattedUser: { [key: string]: any } = {};

    fieldsToExport.forEach((field) => {
      if (field === 'bank_name') {
        formattedUser[field] = user.bank_accounts?.[0]?.bank_name || '';
      } else if (field === 'account_number') {
        formattedUser[field] = user.bank_accounts?.[0]?.account_number || '';
      } else if (field === 'two_factor_enabled') {
        formattedUser[field] = user[field] ? 'true' : 'false';
      } else if (field === 'created_at') {
        formattedUser[field] = user.createdAt || '';
      } else {
        formattedUser[field] = user[field] || '';
      }
    });

    return formattedUser;
  });
};
