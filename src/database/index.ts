import { connect } from 'mongoose';
import configs from '../config';
import seeds from './seeds';

const { host, database, password, port, username } = configs.db;

export async function AppDataSource() {
	await connect(
		`mongodb://${username}:${encodeURIComponent(password)}@${host}:${port}/${database}`,
	).catch((err) => console.error('Something went wrong', err));

	console.log('Now connected to MongoDB!');
	await seeds();
}

export default AppDataSource;
