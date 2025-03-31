import { celebrate, Joi, Segments } from 'celebrate';
const { string } = Joi.types();

export const createDocumentSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        title: string.required(),
        projectId: string.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const updateDocumentSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        title: string.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const deleteDocumentSchema = celebrate(
  {
    [Segments.PARAMS]: Joi.object()
      .keys({
        id: string.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);
