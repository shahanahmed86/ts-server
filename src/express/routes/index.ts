import os from 'os';
import { Router } from 'express';
import appRoutes from './app';
import adminRoutes from './admin';
import commonRoutes from './common';

const router = Router();

// healthcheck
router.get('/healthcheck', (_req, res) => {
	res.send(`I am happy and healthy, from host ${os.hostname()}!\n`);
});

// common routes
router.use('/common', commonRoutes);

// dedicated routes
router.use('/app', appRoutes);
router.use('/admin', adminRoutes);

export default router;
