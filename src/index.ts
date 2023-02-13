import AppDataSource from './typeorm';
import http from 'http';
import { APP_PORT, BASE_URL } from './config';
import app from './express';

const server = http.createServer(app);

AppDataSource.initialize()
	.then(() => {
		if (server.listening) return console.log(server.listening);

		server.listen(APP_PORT, () => console.log(`⚡️[server]: ${BASE_URL}`));
	})
	.catch(console.error);

export default server;
