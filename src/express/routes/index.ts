import os from 'os';
import { Router } from 'express';
import imagesRoutes from './images/images.routes';
import appRoutes from './app';

const router = Router();

router.use('/app', appRoutes);

// common
router.use('/images', imagesRoutes);

// healthcheck
router.get('/healthcheck', (_req, res) => {
	res.send(`I am happy and healthy, from host ${os.hostname()}!\n`);
});

export default router;
