import 'reflect-metadata';
import { DataSource } from 'typeorm';
import configs from '../config';
import entities from './entities';
import migrations from './migrations';

const { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, IN_PROD, DB_LOGGING } = configs.BASE_CONFIG;

const AppDataSource = new DataSource({
	type: 'postgres',
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USER,
	password: DB_PASS,
	database: DB_NAME,
	synchronize: false,
	logging: DB_LOGGING,
	entities,
	migrations,
	subscribers: [],
	migrationsRun: IN_PROD,
	useUTC: true,
});

export default AppDataSource;
