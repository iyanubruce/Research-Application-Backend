import { Schema } from 'mongoose';
export interface CreateDocumentAttributes {
  projectId: string;
  userId: string;
  title: string;
}
export interface UpdateDocumentAttributes {
  documentId: Schema.Types.ObjectId;
  title: string;
}
