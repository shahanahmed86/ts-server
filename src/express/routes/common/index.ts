import express from 'express';
import imagesRoutes from './images/images.routes';
import gendersRoutes from './genders/genders.routes';

const router = express.Router();

router.use('/images', imagesRoutes);
router.use('/genders', gendersRoutes);

export default router;
