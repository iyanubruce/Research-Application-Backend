import mongoose, { Schema, Document } from 'mongoose';

interface ICourse {
  courseId: mongoose.Types.ObjectId; // Reference to a Course model
  lastAccessed: Date; // Metadata about the course
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  courses: ICourse[];
  isAdmin: boolean;
  verifiedEmail: boolean;
  lastLogin: Date;
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
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
    courses: [
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
    verifiedEmail: {
      type: Boolean,
      default: false
    },
    lastLogin: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
