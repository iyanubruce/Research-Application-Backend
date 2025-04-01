import { celebrate, Joi, Segments } from 'celebrate';

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
    [Segments.PARAMS]: Joi.object().keys({
      id: string.required()
    }),
    [Segments.BODY]: Joi.object()
      .keys({
        title: string.required().max(300).optional(),
        description: string.required().max(500).optional()
      })
      .optional()
  },
  {
    abortEarly: false
  }
);

export const deleteProjectSchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object()
      .keys({
        id: string.required()
      })
      .required()
  },
  { abortEarly: false }
);

export const getProjectSchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object()
      .keys({
        id: string.required()
      })
      .required()
  },
  { abortEarly: false }
);
