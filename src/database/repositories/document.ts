import Document, { DocumentAttributes } from '../models/document';
import { ClientSession, Schema } from 'mongoose';

export const createNewDocument = async (document: Partial<DocumentAttributes>, session?: ClientSession) => {
  const { userId, title, projectId } = document;
  const newDocument = await Document.create([{ userId, title, projectId }], session ? { session } : {});
  return newDocument;
};

export const updateDocumentTitleById = async (_id: Schema.Types.ObjectId, title: string, session?: ClientSession) => {
  const updatedDocument = await Document.findByIdAndUpdate(_id, { title }, session ? { session } : {});
  return updatedDocument;
};

export const deleteDocumentById = async (id: string, session?: ClientSession) => {
  await Document.findByIdAndDelete(id, session ? { session } : {});
  return;
};
