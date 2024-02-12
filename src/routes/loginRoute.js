import { Router } from 'express';

const router = new Router;

import loginController from '../controllers/loginController.js'

router.get('/', loginController.index);
router.post('/', loginController.store);

export default router;