import { Router } from 'express';
import { createDocumentSchema, updateDocumentSchema, deleteDocumentSchema } from '../../../validations/document';
import * as documentRequestHandler from '../../request-handlers/document';
const documentRouter = Router();

documentRouter.post('/create', createDocumentSchema, documentRequestHandler.createDocument);
documentRouter.post('/update', updateDocumentSchema, documentRequestHandler.updateDocument);
documentRouter.post('/delete', deleteDocumentSchema, documentRequestHandler.deleteDocument);
