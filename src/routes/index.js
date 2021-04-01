import { Router } from 'express';
import usersRouter from './usersRoutes';
import sessionsRouter from './sessionsRoutes';
import alterRoleRouter from './alterRoleRoutes';

import authMiddleware from '../middlewares/auth';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);

routes.use('/alterrole', authMiddleware, alterRoleRouter);
export default routes;
