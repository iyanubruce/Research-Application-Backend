import { UserStatus } from '../constants/user';

export interface UserSignupInput {
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}
export interface UserLoginInput {
  email: string;
  password: string;
}

export interface GetAllUsersQuery {
  username?: string;
  email?: string;
  status?: UserStatus;
  dateFrom?: string;
  dateTo?: string;
  format?: 'excel' | 'csv';
  page?: number;
  limit?: number;
  fieldsToExport?: string[];
}

export interface GetUserCountQuery {
  status?: UserStatus;
  dateFrom?: string;
  dateTo?: string;
}
