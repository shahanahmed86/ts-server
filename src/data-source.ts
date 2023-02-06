import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER, IN_PROD } from './config';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: DB_HOST,
	port: DB_PORT,
	username: DB_USER,
	password: DB_PASS,
	database: DB_NAME,
	synchronize: IN_PROD,
	logging: !IN_PROD,
	entities: [],
	migrations: [],
	subscribers: [],
	migrationsRun: false,
	uuidExtension: 'uuid-ossp',
});
