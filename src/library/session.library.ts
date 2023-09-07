import RedisStore from 'connect-redis';
import { randomUUID } from 'crypto';
import { Express } from 'express';
import session from 'express-session';
import configs from '../config';
import { SESSION_MAX_AGE } from '../utils/constants.util';
import client from './redis.library';

const { secret } = configs.session;

const cacheService = async (app: Express) => {
	const store = new RedisStore({ client });

	app.use(
		session({
			store,
			genid: () => randomUUID(),
			secret,
			resave: false,
			saveUninitialized: true,
			cookie: {
				secure: configs.app.inProd,
				httpOnly: true,
				maxAge: SESSION_MAX_AGE,
			},
		}),
	);
};

export default cacheService;
