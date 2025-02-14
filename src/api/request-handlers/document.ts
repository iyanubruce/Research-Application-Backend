import { RequestHandler } from 'express';
import * as documentController from '../../controllers/document';
import * as utilities from '../../helpers/utilities';

export const createDocument: RequestHandler = async (req, res, next) => {
  try {
    const document = await documentController.createDocument;
    utilities.itemResponse(document, 'document created');
  } catch (error) {
    next(error);
  }
};

export const updateDocument: RequestHandler = async (req, res, next) => {
  try {
    await documentController.updateDocument(req.body);
    utilities.itemResponse(null, 'document updated');
  } catch (error) {
    next(error);
  }
};

export const deleteDocument: RequestHandler = async (req, res, next) => {
  try {
    await documentController.deleteDocument(req.params.id);
    utilities.itemResponse(null, 'document deleted');
  } catch (error) {
    next(error);
  }
};
