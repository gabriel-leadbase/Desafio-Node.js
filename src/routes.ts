import { Router } from 'express';

import { UserController } from './controllers/UserController';
import { SessionController } from './controllers/SessionController';
import { PermissionController } from './controllers/PermissionController';

const routes = Router();

const userController = new UserController();
const sessionController = new SessionController();
const permissionController = new PermissionController();

routes.post('/sessions', sessionController.create);
routes.post('/users', userController.create);

routes.post('/permissions', permissionController.create);

export default routes;
