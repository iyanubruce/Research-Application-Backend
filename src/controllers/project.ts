import { CreateProjectInput, DeleteProjectInput } from '../interfaces/project';
import { UserAttributes } from 'src/database/models/user';
import {
  createProject as createNewProject,
  updateProject as projectUpdate,
  findProjectByTitleAndId,
  FindAllProjects,
  FindAndDeleteProject
} from '../database/repositories/project';
import { BadRequestError } from 'src/errors';

export const createProject = async (validatedData: CreateProjectInput, user: UserAttributes) => {
  const ProjectExist = await findProjectByTitleAndId(validatedData.title, user.id);
  if (ProjectExist) {
    throw new Error('Project with this title already exists');
  }
  await createNewProject({ title: validatedData.title, userId: user.id, description: validatedData.description });
};

export const updateProject = async (validatedData: CreateProjectInput, user: UserAttributes) => {
  await projectUpdate(validatedData);
};

export const getProjects = async (user: UserAttributes) => {
  const projects = await FindAllProjects(user.id);
  return projects;
};

export const deleteProject = async (validatedData: DeleteProjectInput, user: UserAttributes): Promise<void> => {
  const projectExits = await findProjectByTitleAndId(validatedData.title, user.id);
  if (!projectExits) {
    throw new BadRequestError('This Project does not exist');
  }
  await FindAndDeleteProject(projectExits.id);
};
