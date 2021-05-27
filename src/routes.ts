import { Router } from 'express';
import authMiddleware from './middlewares/authMiddleware';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

const router = Router();
const userController = new UserController();
const authController = new AuthController();

router.post('/users', userController.signUp);

router.post('/auth', authController.login);

router.get('/users', authMiddleware, userController.list);

router.put('/approve/:cpf', authMiddleware, userController.approveSeller);
router.put('/block/:cpf', authMiddleware, userController.blockSeller);

export default router;