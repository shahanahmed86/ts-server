export const {
	NODE_ENV = 'development',

	APP_PROTOCOL = 'http:',
	APP_HOST = 'localhost:7000',

	JWT_SECRET = 'billa-mama',

	DB_HOST = 'db',
	DB_USER = 'admin',
	DB_PASS = 'lmelg8',
	DB_NAME = 'dev_database',

	REDIS_HOST = 'cache',
	REDIS_PASSWORD = 'lmelg8',
} = process.env;

export const APP_PORT = parseInt(process.env.APP_PORT || '7000');

export const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT || '10');
export const BCRYPT_MAX_BYTES = parseInt(process.env.BCRYPT_MAX_BYTES || '72');

export const JWT_EXPIRY = parseInt(process.env.JWT_EXPIRY || '3600000');

export const DB_PORT = parseInt(process.env.DB_PORT || '5432');

export const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379');

export const IN_PROD = NODE_ENV === 'production';

export const DB_LOGGING = NODE_ENV !== 'test';

export const REDIS_URL = `redis://${REDIS_HOST}:${REDIS_PORT}`;

export const BASE_ENDPOINT = `${APP_PROTOCOL}//${APP_HOST}`;
