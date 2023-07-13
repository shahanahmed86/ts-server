import 'reflect-metadata';
import { DataSource } from 'typeorm';
import configs from '../config';
import entities from './entities';
import migrations from './migrations';

const { host, database, password, port, username, logging } = configs.db;
const { inProd } = configs.app;

const AppDataSource = new DataSource({
	type: 'postgres',
	host,
	port: +port,
	username,
	password,
	database,
	synchronize: false,
	logging,
	entities,
	migrations,
	subscribers: [],
	migrationsRun: inProd,
	useUTC: true,
});

export default AppDataSource;
