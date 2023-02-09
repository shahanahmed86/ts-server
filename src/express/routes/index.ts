import os from 'os';
import { Router } from 'express';
import imageRouter from './image/image.routes';

const router = Router();

// common
router.use('/images', imageRouter);

// healthcheck
router.get('/healthcheck', (_req, res) => {
	res.send(`I am happy and healthy, from host ${os.hostname()}!\n`);
});

export default router;
