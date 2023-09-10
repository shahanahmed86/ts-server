import RedisStore from 'connect-redis';
import { Express } from 'express';
import session from 'express-session';
import configs from '../config';
import { getUniqueId } from '../utils/logics.util';
import client from './redis.library';

const { secret, expiry } = configs.session;

const cacheService = async (app: Express) => {
	const store = new RedisStore({ client });

	app.use(
		session({
			store,
			genid: () => getUniqueId(),
			secret,
			resave: false,
			rolling: true,
			saveUninitialized: false,
			cookie: {
				secure: configs.app.inProd,
				httpOnly: true,
				maxAge: expiry,
			},
		}),
	);
};

export default cacheService;
