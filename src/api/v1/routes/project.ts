import { Router } from 'express';
import { createProjectSchema, updateProjectSchema, deleteProjectSchema, getProjectSchema } from '../../../validations/project';
import * as projectRequestHandler from '../../request-handlers/project';
import authenticate from '../../middlewares/user-auth';

const projectRouter = Router();

projectRouter.use(authenticate());

projectRouter.post('/create', createProjectSchema, projectRequestHandler.createProject);
projectRouter.put('/update/:id', updateProjectSchema, projectRequestHandler.updateProject);
projectRouter.get('/', projectRequestHandler.getProjects);
projectRouter.delete('/delete/:id', deleteProjectSchema, projectRequestHandler.deleteProject);
projectRouter.get('/:id', getProjectSchema, projectRequestHandler.getProject);

export default projectRouter;
