export type SetupOptions = {
	forceReInstall: boolean;
	skipPrompts: boolean;
	args?: string;
	BCRYPT_SALT: number;
	BCRYPT_MAX_BYTES: number;
	JWT_SECRET: string;
	JWT_EXPIRY: number;
	DB_HOST: string;
	DB_USER: string;
	DB_PASS: string;
	DB_NAME: string;
	DB_PORT: number;
	REDIS_HOST: string;
	REDIS_PORT: number;
	REDIS_PASSWORD: string;
	CRON_REMOVE_TEMP: string;
};
