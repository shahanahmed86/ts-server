import http from 'http';
import https from 'https';
import { APP_PORT, BASE_URL, IN_PROD, SSL_CERTIFICATE, SSL_KEY } from './config';
import app from './express';

let server: http.Server | https.Server = http.createServer(app);

if (IN_PROD && SSL_KEY && SSL_CERTIFICATE) {
	try {
		const options: https.ServerOptions = {
			key: SSL_KEY,
			cert: SSL_CERTIFICATE,
		};
		server = https.createServer(options, app);
	} catch (error) {
		console.error(error);

		server = http.createServer(app);
	}
}

server.listen(APP_PORT, () => console.log(`⚡️[server]: ${BASE_URL}`));

export default server;
