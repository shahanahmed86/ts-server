import 'dotenv/config';

import * as z from 'zod';

export const Configs = z.object({
	app: z.object({
		env: z.enum(['development', 'test', 'production']).default('development'),
		protocol: z.enum(['http:', 'https:']).default('http:'),
		host: z.string().default('localhost:7000'),
		port: z.string().length(4).default('7000'),
		inProd: z.boolean().default(false),
		baseUrl: z.string().url('Invalid Base URL').default('http://localhost:7000'),
	}),
	jwt: z.object({
		access: z.object({
			secret: z.string().min(1).default('jwt-access-secret'),
			expiry: z.string().min(1).default('3600000'),
		}),
		refresh: z.object({
			secret: z.string().min(1).default('jwt-refresh-secret'),
			expiry: z.string().min(1).default('3600000'),
		}),
	}),
	db: z.object({
		host: z.string().min(1).default('db'),
		port: z.string().length(4).default('5432'),
		username: z.string().min(1).default('admin'),
		password: z.string().min(1).default('lmelg8'),
		database: z.string().min(1).default('dev_database'),
		logging: z.boolean().default(false),
	}),
	bcrypt: z.object({
		salt: z.string().min(2).default('10'),
		maxBytes: z.string().min(2).default('72'),
	}),
	redis: z.object({
		host: z.string().min(1).default('cache'),
		port: z.string().length(4).default('6379'),
		pass: z.string().min(1).default('lmelg8'),
		url: z.string().min(1).default('redis://cache:6379'),
	}),
	session: z.object({
		secret: z.string().min(1).default('session-secret'),
	}),
	cron: z.object({
		removeTempAt: z.string().min(9).default('15 10 * * *'),
	}),
});

export type Configs = z.infer<typeof Configs>;

const allEnvs = {
	app: {
		env: process.env.NODE_ENV,
		protocol: process.env.APP_PROTOCOL,
		host: process.env.APP_HOST,
		port: process.env.APP_PORT,
		inProd: process.env.NODE_ENV === 'production',
		// baseUrl: `${process.env.APP_PROTOCOL}//${process.env.APP_HOST}`,
	},
	jwt: {
		access: {
			secret: process.env.JWT_ACCESS,
			expiry: process.env.JWT_ACCESS_LIFE,
		},
		refresh: {
			secret: process.env.JWT_REFRESH,
			expiry: process.env.JWT_REFRESH_LIFE,
		},
	},
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		user: process.env.DB_USER,
		pass: process.env.DB_PASS,
		name: process.env.DB_NAME,
		logging: process.env.NODE_ENV !== 'test',
	},
	bcrypt: {
		salt: process.env.BCRYPT_SALT,
		maxBytes: process.env.BCRYPT_MAX_BYTES,
	},
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		pass: process.env.REDIS_PASSWORD,
		url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
	},
	session: {
		secret: process.env.SESSION_SECRET,
	},
	cron: {
		removeTempAt: process.env.REOMOVE_TEMP_AT,
	},
};

const configs = Configs.parse(allEnvs);

export default configs;
