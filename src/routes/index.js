import { Router } from 'express';
import usersRouter from './usersRoutes';
import sessionsRouter from './sessionsRoutes';
import alterRoleRouter from './alterRoleRoutes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);
routes.use('/alterrole', alterRoleRouter);
export default routes;
