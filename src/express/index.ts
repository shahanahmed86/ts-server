import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import controllers from '../controllers';
import logger from '../library/morgan.library';
import { SIZE_LIMIT } from '../utils/constants.util';
import { restWrapper } from '../utils/wrappers.util';

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

// x-powered-by
app.disable('x-powered-by');

// healthcheck
app.get('/api/healthcheck', restWrapper(controllers.commonControllers.healthcheck));

export default app;
