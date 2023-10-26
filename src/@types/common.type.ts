export type BaseEnvironment = {
	APP_PORT: number;
	APP_PROTOCOL: string;
	APP_HOST: string;
	BCRYPT_SALT: number;
	BCRYPT_MAX_BYTES: number;
	JWT_SECRET: string;
	DB_HOST: string;
	DB_PORT: number;
	DB_ROOT_USERNAME: string;
	DB_ROOT_PASSWORD: string;
	DB_NAME: string;
	DB_USER: string;
	DB_PASSWORD: string;
	REDIS_HOST: string;
	REDIS_PORT: number;
	REDIS_PASSWORD: string;
	SESSION_SECRET: string;
	SESSION_LIFE: string;
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

export type Role = 'admin' | 'user';
