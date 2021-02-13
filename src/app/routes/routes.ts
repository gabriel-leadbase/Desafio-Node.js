import { Router } from 'express'

import authMiddleware from '../middlewares/authMiddleware';

import userController from '../controllers/userController';
import authController from '../controllers/authController';


const router = Router();

router.get('/', () => { console.log('bateu')})

router.post('/login', authController.authenticate);

router.post('/users', authMiddleware,userController.store);

export default router;