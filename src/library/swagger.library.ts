import { Express } from 'express';
import { serve, setup, SwaggerOptions } from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

const options: SwaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			version: '1.0.0',
			title: 'accounts-app',
			description: 'A typescript nodejs server',
		},
		basePath: '/',
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: ['**/*.swagger.yml'], // files containing annotations as above
};

// swagger setup
const specs = swaggerJsDoc(options);

const swagger = (app: Express) => {
	app.use('/api-docs', serve);
	app.get('/api-docs', setup(specs));
};

export default swagger;
