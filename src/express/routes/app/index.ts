import express from 'express';
import authRoutes from './auth/auth.routes';
import headRoutes from './head/head.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/head', headRoutes);

export default router;
