import { Router } from 'express'
import userController from '../controllers/userController';


const router = Router();

router.get('/', () => { console.log('bateu')})
router.post('/users', userController.store);

export default router;