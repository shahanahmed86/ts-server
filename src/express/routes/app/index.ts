import express from 'express';
import authRoutes from './auth/auth.routes';
import commonRoutes from './common/common.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/common', commonRoutes);

export default router;
