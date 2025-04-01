import Document, { DocumentAttributes } from '../models/document';
import { CreateDocumentAttributes } from '../../interfaces/document';
import { ClientSession, Schema } from 'mongoose';

export const createNewDocument = async (document: Partial<CreateDocumentAttributes>, session?: ClientSession) => {
  const { userId, title, projectId } = document;
  const newDocument = new Document({ userId, title, projectId });
  return newDocument.save(session ? { session } : {});
};
export const findDocumentById = async (_id: string) => {
  const document = await Document.findById(_id).lean();
  return document;
};
export const findDocumentByTitle = async (title: string, userId: string) => {
  const document = await Document.findOne({ title, userId }).lean();
  return document;
};
export const updateDocumentTitleById = async (_id: string, title: string, session?: ClientSession) => {
  const updatedDocument = await Document.findByIdAndUpdate(_id, { title }, session ? { session } : {});
  return updatedDocument;
};

export const deleteDocumentById = async (id: string, session?: ClientSession) => {
  await Document.findByIdAndDelete(id, session ? { session } : {});
  return;
};

export const findDocumentByProjectId = async (projectId: string, session?: ClientSession) => {
  const documents = await Document.find({ projectId }, session ? { session } : {}).lean();
  return documents;
};
