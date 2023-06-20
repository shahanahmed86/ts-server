import 'dotenv/config';

import { BaseEnvironment } from './../@types/common.type';
import * as BASE_CONFIG from './app.config';
import CRON_CONFIG from './cron.config';

interface Environment extends BaseEnvironment {
	NODE_ENV: string;
	DB_LOGGING: boolean;
	IN_PROD: boolean;
	REDIS_URL: string;
	BASE_ENDPOINT: string;
}

type Config = {
	BASE_CONFIG: Environment;
	CRON_CONFIG: typeof CRON_CONFIG;
};

const CONFIGS: Config = {
	BASE_CONFIG,
	CRON_CONFIG,
};

export default CONFIGS;
