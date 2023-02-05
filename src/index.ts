import http from 'http';
import https from 'https';
import { APP_PORT, IN_PROD, SSL_CERTIFICATE, SSL_KEY } from './config';
import app from './express';

let server: http.Server | https.Server = http.createServer(app);

if (IN_PROD && SSL_KEY && SSL_CERTIFICATE) {
	const options: https.ServerOptions = {
		key: SSL_KEY,
		cert: SSL_CERTIFICATE,
	};
	server = https.createServer(options, app);
}

const logServer = `⚡️[server]: Server is running at http://localhost:${APP_PORT}`;
server.listen(APP_PORT, () => console.log(logServer));

export default server;
