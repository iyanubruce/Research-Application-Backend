import { Router } from 'express';
import { createDocumentSchema, updateDocumentSchema, deleteDocumentSchema } from '../../../validations/document';
import * as documentRequestHandler from '../../request-handlers/document';
import authenticate from '../../middlewares/user-auth';

const documentRouter = Router();

documentRouter.use(authenticate());

documentRouter.post('/create', createDocumentSchema, documentRequestHandler.createDocument);
documentRouter.post('/update/:id', updateDocumentSchema, documentRequestHandler.updateDocument);
documentRouter.delete('/delete/:id', deleteDocumentSchema, documentRequestHandler.deleteDocument);

export default documentRouter;
