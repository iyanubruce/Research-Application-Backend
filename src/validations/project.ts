import { celebrate, Joi, Segments } from 'celebrate';
import JoiDate from '@joi/date';
const { string } = Joi.types();

export const createProjectSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        title: string.required().max(300),
        description: string.required().max(500)
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const updateProjectSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        title: string.required().max(300),
        description: string.required().max(500)
      })
      .optional()
  },
  {
    abortEarly: false
  }
);
