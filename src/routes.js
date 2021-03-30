import { Router } from 'express';

const routes = new Router();

routes.post('/', (req, res) => res.json({ message: 'teste' }));

export default routes;
