import mongoose, { Document, Schema } from 'mongoose';

export interface ProjectAttributes extends Document {
  _id: string;
  userId: string;
  title: string;
  description: string;
}

const projectSchema = new Schema<ProjectAttributes>(
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
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.model<ProjectAttributes>('Project', projectSchema);

export default Project;
