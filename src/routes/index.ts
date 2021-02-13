import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';
import UserController from '../app/controllers/UserController';
import { checkJwt } from '../app/middlewares/checkJwt';

import { store as StoreSessionValidator } from '../app/validators/SessionValidator';
import { store as StoreUserValidator } from '../app/validators/UserValidator';

const router = Router();

router.post('/sessions', StoreSessionValidator, SessionController.store);

router.get('/users', checkJwt, UserController.index);
router.post('/users', StoreUserValidator, UserController.store);
router.get('/users/:id', checkJwt, UserController.show);

export default router;
