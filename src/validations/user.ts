import { celebrate, Joi, Segments } from 'celebrate';
import JoiDate from '@joi/date';
import { UserStatus } from '../constants/user';

const { string, number, array, boolean } = Joi.types();
const dateValidator = Joi.extend(JoiDate);

const passwordSchema = string
  .trim()
  .min(8)
  .max(100)
  .regex(/[A-Z]/, 'upper-case')
  .regex(/[a-z]/, 'lower-case')
  .regex(/[^\w]/, 'special character')
  .regex(/[0-9]/, 'digits');

const fieldsToExport = ['email', 'username', 'avatar', 'status', 'last_login', 'role', 'works'];
export const createUserSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        email: string.email().required(),
        username: string.trim().required().max(100),
        password: passwordSchema.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const loginSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        email: string.email().required(),
        password: string.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const completeTwoFactorLoginSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        token: string.required(),
        code: string.required().max(6)
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const getAllUsersSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object()
      .keys({
        status: string.trim().valid(...Object.values(UserStatus)),
        username: string,
        email: string,
        dateFrom: dateValidator.date().format('YYYY-MM-DD').raw(),
        dateTo: dateValidator.date().format('YYYY-MM-DD').raw(),
        format: string.valid('excel', 'csv'),
        page: number,
        limit: number,
        fieldsToExport: array.items(string.trim().valid(...fieldsToExport))
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const getAllUsersCountSchema = celebrate(
  {
    [Segments.QUERY]: Joi.object()
      .keys({
        status: string.trim().valid(...Object.values(UserStatus)),
        dateFrom: dateValidator.date().format('YYYY-MM-DD').raw(),
        dateTo: dateValidator.date().format('YYYY-MM-DD').raw()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const userParamsSchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object()
      .keys({
        id: string.trim().required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const adminUpdateUserSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        status: string
          .trim()
          .valid(...Object.values(UserStatus))
          .required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);
