import { Router } from 'express';
import { createProjectSchema, updateProjectSchema } from '../../../validations/project';
import * as projectRequestHandler from '../../request-handlers/project';

const projectRouter = Router();

projectRouter.post('/create', createProjectSchema, projectRequestHandler.createProject);
projectRouter.put('/update', updateProjectSchema, projectRequestHandler.updateProject);
projectRouter.get('/get', projectRequestHandler.getProjects);
projectRouter.delete('/delete/:title', projectRequestHandler.deleteProject);

export default projectRouter;
