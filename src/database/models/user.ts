import mongoose, { Schema, Document } from 'mongoose';

export interface UserAttributes extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  status?: string;
  isActive?: boolean;
  lastLogin?: Date;
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

    status: {
      type: String,
      enum: ['active', 'inactive', 'deleted'],
      default: 'active'
    },
    isActive: {
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
