import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import helmet from 'helmet';
import path from 'path';
import configs from '../config';
import scheduledJobs from '../library/cron.library';
import { setLanguage } from '../library/i18n.library';
import logger from '../library/morgan.library';
import rateLimiter from '../library/rate-limiter.library';
import cacheService from '../library/session.library';
import swagger from '../library/swagger.library';
import tooBusy from '../library/toobusy.library';
import { SIZE_LIMIT } from '../utils/constants.util';
import { errorHandler, notFound } from './middleware/error.middleware';
import routes from './routes';

const { inProd, inTest } = configs.app;

const app = express();

// parser
app.use(express.urlencoded({ extended: true, limit: SIZE_LIMIT }));
app.use(express.json({ limit: SIZE_LIMIT }));
app.use(cookieParser());

if (!inTest) {
	// helmet
	const policy = inProd ? undefined : false;
	app.use(helmet({ contentSecurityPolicy: policy }));

	// too-busy
	app.use(tooBusy);

	// express-rate-limit
	app.use(rateLimiter);
}

// cors
app.use(cors());

// compression
app.use(compression());

// enable proxy if it's in prod.
if (inProd) {
	const NUMBER_OF_PROXY = 1;
	app.set('trust proxy', NUMBER_OF_PROXY);
}

// cache
cacheService(app);

// middleware for express-fileupload
app.use(fileUpload({ limits: { fileSize: SIZE_LIMIT } }));

// logs
app.use(logger);

// localization
setLanguage(app);

// disable x-powered-by to avoid giving hint to hackers
app.disable('x-powered-by');

// Configure Express to use EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routings
app.use('/api', routes);

app.get('/test-html', (_, res) => res.render('index'));

// swagger
if (!inProd) swagger(app);

// when route not found
app.use(notFound);

// error handler
app.use(errorHandler);

// cron jobs
scheduledJobs();

export default app;
