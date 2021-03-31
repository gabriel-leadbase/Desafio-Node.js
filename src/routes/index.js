import { Router } from 'express';
import usersRouter from './usersRoutes';

const routes = Router();

routes.use('/users', usersRouter);

export default routes;
