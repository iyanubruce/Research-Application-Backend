import { UserAttributes } from 'src/database/models/user';
import {
  createNewDocument,
  updateDocumentTitleById,
  deleteDocumentById,
  findDocumentByTitle,
  findDocumentById
} from '../database/repositories/document';

import { findProjectById } from '../database/repositories/project';
import { CreateDocumentAttributes, UpdateDocumentAttributes } from '../interfaces/document';
import { BadRequestError } from '../errors';

export const createDocument = async (validatedData: CreateDocumentAttributes, user: UserAttributes) => {
  const { projectId, title } = validatedData;

  const projectExist = await findProjectById(projectId);
  if (!projectExist) {
    throw new BadRequestError('This Project does not exist');
  }
  if (projectExist.userId.toString() !== user._id.toString()) {
    throw new BadRequestError('You are not authorized to create a document in this project');
  }

  const existingDocument = await findDocumentByTitle(title, user._id);
  if (existingDocument) {
    throw new BadRequestError('Document with the same title already exists');
  }

  const newDocument = await createNewDocument({ projectId, title, userId: user._id });
  return newDocument;
};

export const updateDocument = async (title: string, documentId: string, userId: string) => {
  const [existingDocument, document] = await Promise.all([findDocumentByTitle(title, userId), findDocumentById(documentId)]);

  if (existingDocument) {
    throw new BadRequestError('Document with the same title already exists');
  }
  if (!document) {
    throw new BadRequestError('This Document does not exist');
  }
  if (document.userId.toString() !== userId.toString()) {
    throw new BadRequestError('You are not authorized to update this document');
  }

  await updateDocumentTitleById(documentId, title);
};

export const deleteDocument = async (id: string, userId: string) => {
  const document = await findDocumentById(id);
  if (!document) {
    throw new BadRequestError('This Document does not exist');
  }
  if (document.userId.toString() !== userId.toString()) {
    throw new BadRequestError('You are not authorized to Delete this document');
  }
  await deleteDocumentById(id);
};
