import { Router } from 'express';
import usersRouter from './usersRoutes';
import sessionsRouter from './sessionsRoutes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/session', sessionsRouter);
export default routes;
