import { Router } from 'express';

const router = new Router;

import cadastroController from '../controllers/cadastroController.js'

router.get('/', cadastroController.index);
router.post('/', cadastroController.store);

export default router;