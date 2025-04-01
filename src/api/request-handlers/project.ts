import { RequestHandler } from 'express';
import * as projectController from '../../controllers/project';
import * as utilities from '../../helpers/utilities';

export const createProject: RequestHandler = async (req, res, next) => {
  try {
    const project = await projectController.createProject(req.body, res.locals.user);
    res.json(utilities.itemResponse(project, 'project created'));
    return;
  } catch (error) {
    next(error);
  }
};

export const updateProject: RequestHandler = async (req, res, next) => {
  try {
    await projectController.updateProject(req.params.id, req.body);
    res.json(utilities.itemResponse(null, 'Project updated'));
    return;
  } catch (error) {
    next(error);
  }
};

export const getProjects: RequestHandler = async (req, res, next) => {
  try {
    const projects = await projectController.getProjects(res.locals.user);

    res.json(utilities.itemResponse(projects, 'Project updated'));
    return;
  } catch (error) {
    next(error);
  }
};

export const deleteProject: RequestHandler = async (req, res, next) => {
  try {
    await projectController.deleteProject(req.params.id);
    res.json(utilities.itemResponse(null, 'Project deleted'));
    return;
  } catch (error) {
    next(error);
  }
};

export const getProject: RequestHandler = async (req, res, next) => {
  try {
    const project = await projectController.getProject(req.params.id);
    res.json(utilities.itemResponse(project, 'Project'));
    return;
  } catch (error) {
    next(error);
  }
};
