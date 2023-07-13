export type BaseEnvironment = {
	APP_PROTOCOL: string;
	APP_HOST: string;
	APP_PORT: number;
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
	REDIS_PASSWORD: string;
	REDIS_PORT: number;
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
