import { createClient } from 'redis';
import configs from '../config';
import { JWT_EXPIRY_IN_SECONDS } from '../utils/constants.util';

const { redis, db } = configs;

const redisClient = createClient({ password: redis.pass, url: redis.url });

redisClient.get('isConnected').catch((e: Error) => {
	const hasRunSync = db.host === 'localhost';
	if (e.message === 'The client is closed' && !hasRunSync) {
		redisClient.connect().catch(console.error);
	}
});

export const AddToken = async (key: string, token: string) => {
	return redisClient.set(key, token, { EX: JWT_EXPIRY_IN_SECONDS });
};

export const GetToken = async (key: string) => redisClient.get(key);

export const RemoveToken = async (key: string) => redisClient.del(key);

export default redisClient;
