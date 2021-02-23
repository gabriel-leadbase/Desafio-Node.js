import { Router } from 'express';
import SessionController from '../app/controllers/SessionController';
import UserController from '../app/controllers/UserController';
import UserPermissionController from '../app/controllers/UserPermissionController';
import { checkJwt } from '../app/middlewares/checkJwt';
import { checkRole } from '../app/middlewares/checkRole';

import { store as StoreSessionValidator } from '../app/validators/SessionValidator';
import { store as StoreUserValidator } from '../app/validators/UserValidator';
import {
  store as StoreUserPermissionValidator,
  destroy as DestroyUserPermissionValidator
} from '../app/validators/UserPermissionValidator';

const router = Router();

// SESSIONS
router.post('/sessions', StoreSessionValidator, SessionController.store);

// USERS
router.get('/users', checkJwt, UserController.index);
router.post('/users', StoreUserValidator, UserController.store);
router.get('/users/:id', checkJwt, UserController.show);

// USER PERMISSIONS
router.post(
  '/users/:id/permissions',
  [checkJwt, checkRole],
  StoreUserPermissionValidator,
  UserPermissionController.store
);

router.delete(
  '/users/:id/permissions',
  [checkJwt, checkRole],
  DestroyUserPermissionValidator,
  UserPermissionController.destroy
);

export default router;
