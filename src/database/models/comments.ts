import mongoose, { Schema, Document } from 'mongoose';

interface CommentAttributes extends Document {
  _id: string;
  userId: string;
  documentId: string;
  content: string;
  isResolved?: boolean;
}

const commentSchema = new Schema<CommentAttributes>(
  {
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
    documentId: {
      type: Schema.Types.String,
      ref: 'Document',
      required: true,
      validate: {
        validator: function (v: string) {
          return mongoose.Types.ObjectId.isValid(v);
        },
        message: (props) => `${props.value} is not a valid ObjectId!`
      }
    },
    content: {
      type: String,
      required: true
    },
    isResolved: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<CommentAttributes>('Comment', commentSchema);

export default Comment;
