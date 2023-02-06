import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import scheduledJobs from '../library/cron.library';
import logger from '../library/morgan.library';
import { SIZE_LIMIT } from '../utils/constants.util';
import routes from './routes';

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

// routings
app.use('/api', routes);

// when route not found
app.use((_, res) => res.status(404).send('Route not found'));

// cron jobs
scheduledJobs();

export default app;
