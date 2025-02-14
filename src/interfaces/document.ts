import { Schema } from 'mongoose';
export interface CreateDocumentAttributes {
  projectId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  title: string;
}
export interface UpdateDocumentAttributes {
  documentId: Schema.Types.ObjectId;
  title: string;
}
