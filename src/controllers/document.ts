import { UserAttributes } from 'src/database/models/user';
import { createNewDocument, updateDocumentTitleById, deleteDocumentById } from '../database/repositories/document';
import { CreateDocumentAttributes, UpdateDocumentAttributes } from '../interfaces/document';
import { Schema } from 'mongoose';

export const createDocument = async (validatedData: CreateDocumentAttributes) => {
  const { projectId, title, userId } = validatedData;
  const newDocument = await createNewDocument({ projectId, title, userId });
  return newDocument;
};
export const updateDocument = async (validatedData: UpdateDocumentAttributes) => {
  await updateDocumentTitleById(validatedData.documentId, validatedData.title);
};

export const deleteDocument = async (id: string) => {
  await deleteDocumentById(id);
};
