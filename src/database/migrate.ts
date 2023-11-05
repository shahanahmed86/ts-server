import configs from '../config';

export const config = {
	uri: configs.db.url,
	collection: 'migrations',
	migrationsPath: `${__dirname}/migrations`,
	autosync: true,
};

export default config;
