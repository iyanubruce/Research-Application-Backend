import mongoose, { Schema, Document } from 'mongoose';

interface IWorks {
  courseId: mongoose.Types.ObjectId;
  lastAccessed: Date;
}

export interface UserAttributes extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  works?: IWorks[];
  isAdmin?: boolean;
  verifiedEmail?: boolean;
  status?: string;
  lastLogin?: Date;
  createdAt?: Date;
}

export const userSchema = new Schema<UserAttributes>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    works: [
      {
        courseId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Course'
        },
        lastAccessed: {
          type: Date,
          default: Date.now
        }
      }
    ],
    isAdmin: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active'
    },
    verifiedEmail: {
      type: Boolean,
      default: true
    },
    lastLogin: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<UserAttributes>('User', userSchema);

export default User;
