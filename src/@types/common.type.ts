export type BaseEnvironment = {
	APP_PROTOCOL: string;
	APP_HOST: string;
	APP_PORT: number;
	BCRYPT_SALT: number;
	BCRYPT_MAX_BYTES: number;
	JWT_ACCESS_SECRET: string;
	JWT_ACCESS_EXPIRY: number;
	JWT_REFRESH_SECRET: string;
	JWT_REFRESH_EXPIRY: number;
	DB_HOST: string;
	DB_USER: string;
	DB_PASS: string;
	DB_NAME: string;
	DB_PORT: number;
	REDIS_HOST: string;
	REDIS_PASSWORD: string;
	REDIS_PORT: number;
	SESSION_SECRET: string;
};

export interface SetupOptions extends BaseEnvironment {
	forceReInstall: boolean;
	skipPrompts: boolean;
	args?: string;
}

export type Pagination = {
	offset?: string;
	limit?: string;
	search?: string;
};
