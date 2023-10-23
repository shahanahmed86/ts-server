import { connect } from 'mongoose';
import configs from '../config';

const { host, database, password, port, username } = configs.db;

export async function AppDataSource() {
	return connect(
		`mongodb://${username}:${encodeURIComponent(password)}@${host}:${port}/${database}`,
	);
}

export default AppDataSource;
