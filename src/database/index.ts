import { connect } from 'mongoose';
import configs from '../config';

const { url } = configs.db;

export async function AppDataSource() {
	await connect(url).catch(console.error);

	console.log('Now connected to MongoDB!');
}

export default AppDataSource;
