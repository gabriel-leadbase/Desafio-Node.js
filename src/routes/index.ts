import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';
import UserController from '../app/controllers/UserController';

import { store as StoreSessionValidator } from '../app/validators/SessionValidator';
import { store as StoreUserValidator } from '../app/validators/UserValidator';

const router = Router();

router.post('/sessions', StoreSessionValidator, SessionController.store);
router.post('/users', StoreUserValidator, UserController.store);

export default router;
