import { Router } from 'express';
import imagesRoutes from './images/images.routes';
import gendersRoutes from './genders/genders.routes';
import rolesRoutes from './roles/roles.routes';

const router = Router();

router.use('/images', imagesRoutes);
router.use('/genders', gendersRoutes);
router.use('/roles', rolesRoutes);

export default router;
