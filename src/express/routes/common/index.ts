import { Router } from 'express';
import imagesRoutes from './images/images.routes';
import gendersRoutes from './genders/genders.routes';

const router = Router();

router.use('/images', imagesRoutes);
router.use('/genders', gendersRoutes);

export default router;
