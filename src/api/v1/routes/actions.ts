import { Router } from 'express';
import {
  checkGrammarSchema,
  plagiarismSchema,
  chatbotSchema,
  summarizeSchema,
  journalMatchingSchema,
  checkToneSchema
} from '../../../validations/actions';
import authenticate from 'src/api/middlewares/user-auth';
import * as actionsRequestHandler from '../../request-handlers/actions';

const actionsRouter = Router();
actionsRouter.use(authenticate());

actionsRouter.post('/check-grammar', checkGrammarSchema, actionsRequestHandler.checkGrammar);
actionsRouter.post('check-tone', checkToneSchema, actionsRequestHandler.checkTone);
actionsRouter.post('/journal-matching', journalMatchingSchema, actionsRequestHandler.journalMatching);
actionsRouter.post('/summarize', summarizeSchema, actionsRequestHandler.summarize);
actionsRouter.post('/chatbot', chatbotSchema, actionsRequestHandler.chatbot);
actionsRouter.post('/plagiarism', plagiarismSchema, actionsRequestHandler.plagiarism);
