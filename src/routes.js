import { Router } from 'express';
import * as Controller from './controllers.js';

const router = Router();

router.post('/', Controller.createUser);
router.get('/', Controller.getUsers);
router.get('/:id', Controller.getUser);
router.put('/:id', Controller.modifyUser);

export default router;