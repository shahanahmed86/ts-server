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
import AppDataSource from './database';

const { port, baseUrl, env } = configs.app;

let schema = makeExecutableSchema(graphQLSchema);

Object.entries(directives).forEach(([key, directive]) => {
	schema = directive(schema, key);
});

const httpServer = http.createServer(app);

const wsServer = new WebSocketServer({ server: httpServer, path: '/graphql' });
const serverCleanup = useServer({ schema }, wsServer);

const server = new ApolloServer({
	nodeEnv: env,
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

AppDataSource()
	.then(async () => {
		await server.start();

		app.use(expressMiddleware(server, { context: async ({ req, res }) => ({ req, res }) }));

		if (httpServer.listening) {
			console.log('Already listening to the port');
			return;
		}

		httpServer.listen(port, () => console.log(`⚡️[server]: ${baseUrl}`));
	})
	.catch(console.error);

export default httpServer;
