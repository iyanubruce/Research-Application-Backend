import { celebrate, Joi, Segments } from 'celebrate';
import JoiDate from '@joi/date';
import { UserStatus } from '../constants/user';

const { string, number, array, boolean } = Joi.types();

const passwordSchema = string
  .trim()
  .min(8)
  .max(100)
  .regex(/[A-Z]/, 'upper-case')
  .regex(/[a-z]/, 'lower-case')
  .regex(/[^\w]/, 'special character')
  .regex(/[0-9]/, 'digits');

export const createUserSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        email: string.email().required(),
        userName: string.trim().required().max(100),
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
