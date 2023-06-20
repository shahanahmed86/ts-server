import fs from 'fs';
import os from 'os';
import morgan from 'morgan';
import configs from '../config';
import { Request, Response } from 'express';
import { MORGAN_TOKENS } from '../utils/constants.util';

const { IN_PROD } = configs.BASE_CONFIG;

morgan.token('host', os.hostname);
morgan.token('error', (_, res: Response) => {
	if (!res.locals.error) return '';
	return res.locals.error.message;
});

const skip = (_req: Request, res: Response) => (IN_PROD ? res.statusCode < 400 : false);
const stream = IN_PROD ? fs.createWriteStream('./error.log', { flags: 'a' }) : undefined;

const logger = morgan(MORGAN_TOKENS, { skip, stream });

export default logger;
