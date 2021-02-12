import { Router } from 'express';
import UserController from '../app/controllers/UserController';
const router = Router();

router.get('/users', UserController.index);

export default router;
