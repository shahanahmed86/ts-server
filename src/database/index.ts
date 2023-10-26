import { connect } from 'mongoose';
import configs from '../config';
import seeds from './seeds';

const { url } = configs.db;

export async function AppDataSource() {
	await connect(url).catch((err) => console.error('Something went wrong', err));

	console.log('Now connected to MongoDB!');
	await seeds();
}

export default AppDataSource;
