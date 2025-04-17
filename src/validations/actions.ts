import { celebrate, Joi, Segments } from 'celebrate';
import JoiDate from '@joi/date';
const { string, number, array, boolean } = Joi.types();
const dateValidator = Joi.extend(JoiDate);

export const checkGrammarSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        text: string.required(),
        language: string.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const plagiarismSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        chapter: string.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const chatbotSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        query: string.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const summarizeSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        text: string.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);

export const journalMatchingSchema = celebrate({
  [Segments.BODY]: Joi.object()
    .keys({
      name: string.required()
    })
    .required()
});

export const checkToneSchema = celebrate(
  {
    [Segments.BODY]: Joi.object()
      .keys({
        chapter: string.required()
      })
      .required()
  },
  {
    abortEarly: false
  }
);
//   checkToneSchema;
