import { RequestHandler } from 'express';
import * as projectController from '../../controllers/project';
import * as utilities from '../../helpers/utilities';

export const createProject: RequestHandler = async (req, res, next) => {
  try {
    await projectController.createProject(req.body, res.locals.user);
    utilities.itemResponse(null, 'project created');
  } catch (error) {
    next(error);
  }
};

export const updateProject: RequestHandler = async (req, res, next) => {
  try {
    await projectController.updateProject(req.body, res.locals.user);
    utilities.itemResponse(null, 'Project updated');
  } catch (error) {
    next(error);
  }
};

export const getProjects: RequestHandler = async (req, res, next) => {
  try {
    const projects = await projectController.getProjects(res.locals.user);

    utilities.itemResponse(projects, 'Project updated');
  } catch (error) {
    next(error);
  }
};

export const deleteProject: RequestHandler = async (req, res, next) => {
  try {
    await projectController.deleteProject(req.body, res.locals.user);
    utilities.itemResponse(null, 'Project deleted');
  } catch (error) {
    next(error);
  }
};
