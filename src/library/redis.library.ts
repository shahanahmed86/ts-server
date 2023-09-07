import { createClient } from 'redis';
import configs from '../config';

const { redis, db } = configs;

const redisClient = createClient({ password: redis.pass, url: redis.url });

redisClient.get('isConnected').catch((e: Error) => {
	const hasRunSync = db.host === 'localhost';
	if (e.message === 'The client is closed' && !hasRunSync) {
		redisClient.connect().catch(console.error);
	}
});

export default redisClient;
