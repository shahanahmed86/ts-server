import os from 'os';
import { Router } from 'express';
import commonRoutes from './common';

const router = Router();

// common
router.use('/common', commonRoutes);

// healthcheck
router.get('/healthcheck', (_req, res) => {
	res.send(`I am happy and healthy, from host ${os.hostname()}!\n`);
});

export default router;
