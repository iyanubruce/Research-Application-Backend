import { CreateProjectInput, DeleteProjectInput } from '../interfaces/project';
import { UserAttributes } from 'src/database/models/user';
import {
  createProject as createNewProject,
  updateProject as projectUpdate,
  findProjectByTitleAndId,
  findAllProjects,
  findProjectById,
  findAndDeleteProject
} from '../database/repositories/project';
import { BadRequestError } from '../errors';

export const createProject = async (validatedData: CreateProjectInput, user: UserAttributes) => {
  const ProjectExist = await findProjectByTitleAndId(validatedData.title, user._id);

  if (ProjectExist) {
    throw new BadRequestError('Project with this title already exists');
  }

  const newProject = await createNewProject({ userId: user._id, ...validatedData });
  return newProject;
};

export const updateProject = async (id: string, validatedData: CreateProjectInput) => {
  await projectUpdate(id, validatedData);
};

export const getProjects = async (user: UserAttributes) => {
  const projects = await findAllProjects(user._id);
  return projects;
};

export const deleteProject = async (id: string): Promise<void> => {
  const projectExits = await findProjectById(id);
  if (!projectExits) {
    throw new BadRequestError('This Project does not exist');
  }

  await findAndDeleteProject(projectExits._id);
};
