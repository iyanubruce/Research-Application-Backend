import { RequestHandler } from 'express';
import * as actionsController from '../../controllers/actions';
import * as utilities from '../../helpers/utilities';

export const checkGrammar: RequestHandler = async (req, res, next) => {
  try {
    const grammarFixes = await actionsController.checkGrammar(req.body.text, req.body.language);
    res.json(utilities.itemResponse(grammarFixes, 'done'));
    return;
  } catch (error) {
    next(error);
  }
};

export const checkTone: RequestHandler = async (req, res, next) => {
  try {
    const toneFixes = await actionsController.checkTone(req.body.chapter);
    res.json(utilities.itemResponse(toneFixes, 'done'));
    return;
  } catch (error) {
    next(error);
  }
};

export const journalMatching: RequestHandler = async (req, res, next) => {
  try {
    const matchedJournals = await actionsController.journalMatching(req.body.name);
    res.json(utilities.itemResponse(matchedJournals, 'journals found'));
    return;
  } catch (error) {
    next(error);
  }
};

export const summarize: RequestHandler = async (req, res, next) => {
  try {
    const summary = await actionsController.summarize(req.body.text);
    res.json(utilities.itemResponse(summary, 'journals found'));
    return;
  } catch (error) {
    next(error);
  }
};

export const plagiarism: RequestHandler = async (req, res, next) => {
  try {
    const detectedPlagiarism = await actionsController.plagiarism(req.body.text);
    res.json(utilities.itemResponse(detectedPlagiarism, 'journals found'));
    return;
  } catch (error) {
    next(error);
  }
};

export const chatbot: RequestHandler = async (req, res, next) => {
  try {
    const response = await actionsController.chatbot(req.body.text);
    res.json(utilities.itemResponse(response, 'journals found'));
    return;
  } catch (error) {
    next(error);
  }
};
