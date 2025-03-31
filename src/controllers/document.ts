import { UserAttributes } from 'src/database/models/user';
import {
  createNewDocument,
  updateDocumentTitleById,
  deleteDocumentById,
  findDocumentByTitle
} from '../database/repositories/document';
import { CreateDocumentAttributes, UpdateDocumentAttributes } from '../interfaces/document';
import { BadRequestError } from '../errors';
export const createDocument = async (validatedData: CreateDocumentAttributes, user: UserAttributes) => {
  const { projectId, title } = validatedData;

  const existingDocument = await findDocumentByTitle(title, user._id);
  if (existingDocument) {
    throw new BadRequestError('Document with the same title already exists');
  }

  const newDocument = await createNewDocument({ projectId, title, userId: user._id });
  return newDocument;
};
export const updateDocument = async (validatedData: UpdateDocumentAttributes) => {
  await updateDocumentTitleById(validatedData.documentId, validatedData.title);
};

export const deleteDocument = async (id: string) => {
  await deleteDocumentById(id);
};
