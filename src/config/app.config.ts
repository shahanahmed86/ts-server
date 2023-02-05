export const {
	NODE_ENV = 'development',
	APP_PROTOCOL = 'http:',
	APP_HOST = 'localhost:8080',

	JWT_SECRET = 'billa-mama',

	DB_HOST = 'mysqldb',
	DB_USER = 'admin',
	DB_PASS = 'lmelg8',
	DB_NAME = 'dev_database',
	DB_DIALECT = 'mysql',

	CRON_REMOVE_TEMP = '15 10 * * *',

	SSL_KEY,
	SSL_CERTIFICATE,
} = process.env;

export const IN_PROD = NODE_ENV === 'production';

export const APP_PORT = +(process.env.APP_PORT || '8080');

export const BCRYPT_SALT = +(process.env.BCRYPT_SALT || '10');

export const BCRYPT_MAX_BYTES = +(process.env.BCRYPT_MAX_BYTES || '72');

export const JWT_EXPIRY = +(process.env.JWT_EXPIRY || '3600000');

export const DB_PORT = +(process.env.DB_PORT || '3306');
export const DB_LOGGING = IN_PROD;

export const JOBS = {
	removeTemp: CRON_REMOVE_TEMP,
};
