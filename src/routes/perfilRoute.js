import { Router } from 'express';

const router = new Router;

import perfilController from '../controllers/perfilController.js';
import loginRequired from '../middleware/loginRequired.js';

router.get('/', loginRequired, perfilController.index);

export default router;