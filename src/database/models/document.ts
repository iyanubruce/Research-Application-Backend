import mongoose, { Schema, Document as MongooseDocument } from 'mongoose';

export interface DocumentAttributes extends MongooseDocument {
  _id: string;
  projectId: string;
  userId: string;
  title: string;
  content: string;
  status?: string;
  isDeleted?: boolean;
}

const documentSchema = new Schema<DocumentAttributes>(
  {
    projectId: {
      type: Schema.Types.String,
      ref: 'Project',
      required: true,
      validate: {
        validator: function (v: string) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: (props) => `${props.value} is not a valid ObjectId!`
      }
    },
    userId: {
      type: Schema.Types.String,
      ref: 'User',
      required: true,
      validate: {
        validator: function (v: string) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: (props) => `${props.value} is not a valid ObjectId!`
      }
    },
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

const Document = mongoose.model<DocumentAttributes>('Document', documentSchema);

export default Document;
