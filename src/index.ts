import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { useServer } from 'graphql-ws/lib/use/ws';
import http from 'http';
import { WebSocketServer } from 'ws';
import configs from './config';
import app from './express';
import graphQLSchema from './graphql';
import directives from './graphql/directives';
import AppDataSource from './typeorm';

const { APP_PORT, BASE_ENDPOINT, NODE_ENV } = configs.BASE_CONFIG;

let schema = makeExecutableSchema(graphQLSchema);

Object.entries(directives).forEach(([key, directive]) => {
	schema = directive(schema, key);
});

const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
	nodeEnv: NODE_ENV,
	schema,
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		{
			async serverWillStart() {
				return {
					async drainServer() {
						await serverCleanup.dispose();
					},
				};
			},
		},
	],
});

AppDataSource.initialize()
	.then(async () => {
		await server.start();
		app.use(expressMiddleware(server, { context: async ({ req, res }) => ({ req, res }) }));

		if (httpServer.listening) return console.log('Already listening to the port');
		httpServer.listen(APP_PORT, () => console.log(`⚡️[server]: ${BASE_ENDPOINT}`));
	})
	.catch(console.error);

export default httpServer;
