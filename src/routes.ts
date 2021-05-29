import { Router } from 'express';

import { UserController } from './controllers/UserController';
import { SessionController } from './controllers/SessionController';

const routes = Router();

const userController = new UserController();
const sessionController = new SessionController();

routes.post('/sessions', sessionController.create);
routes.post('/users', userController.create);

export default routes;
