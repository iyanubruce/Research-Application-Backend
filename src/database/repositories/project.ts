import Project, { ProjectAttributes } from '../models/project';
import { ClientSession, Schema } from 'mongoose';

export const createProject = async (project: Partial<ProjectAttributes>, session?: ClientSession) => {
  const newProject = new Project({ title: project.title, description: project.description, userId: project.userId });

  if (session) {
    await newProject.save({ session });
  } else {
    await newProject.save();
  }

  return newProject;
};

export const findProjectByTitleAndId = async (title: string, _id: string) => {
  const project = await Project.findOne({ userId: _id, title }).lean();
  console.log(project);
  return project;
};

export const findProjectById = async (_id: string) => {
  const project = await Project.findById(_id).lean();
  return project;
};
export const updateProject = async (id: string, project: Partial<ProjectAttributes>, session?: ClientSession) => {
  const updateFields: Partial<ProjectAttributes> = {};

  if (project.title) updateFields.title = project.title;
  if (project.description) updateFields.description = project.description;

  await Project.updateOne({ _id: id }, { $set: updateFields }, session ? { session } : {});
  return;
};

export const findAllProjects = async (userId: string) => {
  const projects = Project.find({ userId }).lean();
  return projects;
};

export const findAndDeleteProject = async (ProjectId: string) => {
  await Project.findByIdAndDelete({ ProjectId });
  return;
};
