import Project, { ProjectAttributes } from '../models/project';
import { ClientSession, Schema } from 'mongoose';

export const createProject = async (project: Partial<ProjectAttributes>, session?: ClientSession) => {
  const newProject = new Project({ project });

  if (session) {
    await newProject.save({ session });
  } else {
    await newProject.save();
  }

  return newProject;
};

export const findProjectByTitleAndId = async (title: string, _id: string) => {
  const project = await Project.findOne({
    userId: _id,
    title
  });
  return project;
};

export const updateProject = async (project: Partial<ProjectAttributes>, session?: ClientSession) => {
  const { userId, _id, ...updatedData } = project;
  await Project.updateOne({ userId }, { $set: updatedData }, session ? { session } : {});
  return;
};

export const FindAllProjects = async (userId: Schema.Types.ObjectId) => {
  const projects = Project.find({ userId });
  return projects;
};

export const FindAndDeleteProject = async (ProjectId: Schema.Types.ObjectId) => {
  await Project.findByIdAndDelete({ ProjectId });
  return;
};
