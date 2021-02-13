import { Router } from 'express'

import authMiddleware from '../middlewares/authMiddleware';

import userController from '../controllers/users/userController';
import authController from '../controllers/auth/authController';
import permissionController from '../controllers/permissions/permissionController';


const router = Router();

router.post('/login', authController.authenticate);
router.post('/register', userController.store);

router.post('/permission', authMiddleware, permissionController.store)
router.put('/permission/update', authMiddleware, permissionController.update)
router.delete('/permission/delete', authMiddleware, permissionController.delete);

export default router;