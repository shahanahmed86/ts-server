import { createClient } from 'redis';
import { DB_HOST, JWT_EXPIRY, REDIS_PASSWORD, REDIS_URL } from '../config';

const redisClient = createClient({ password: REDIS_PASSWORD, url: REDIS_URL });

redisClient.get('isConnected').catch((e: Error) => {
	const hasRunSync = DB_HOST === 'localhost';
	if (e.message === 'The client is closed' && !hasRunSync) {
		redisClient.connect().catch(console.error);
	}
});

export const AddToken = async (key: string, token: string) => {
	return redisClient.set(key, token, { EX: JWT_EXPIRY });
};

export const GetToken = async (key: string) => redisClient.get(key);

export const RemoveToken = async (key: string) => redisClient.del(key);

export default redisClient;
