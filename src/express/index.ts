import os from 'os';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import logger from '../library/morgan.library';
import { SIZE_LIMIT } from '../utils/constants.util';

const app = express();

// parser
app.use(express.urlencoded({ extended: true, limit: SIZE_LIMIT }));
app.use(express.json({ limit: SIZE_LIMIT }));

// cors
app.use(cors());

// middleware for express-fileupload
app.use(fileUpload({ limits: { fileSize: SIZE_LIMIT } }));

// logs
app.use(logger);

// disable x-powered-by to avoid giving hint to hackers
app.disable('x-powered-by');

// healthcheck
app.get('/api/healthcheck', (_, res) => res.send(`I am healthy at ${os.hostname()}`));

// when route not found
app.use((_, res) => res.status(404).send('Route not found'));

export default app;
