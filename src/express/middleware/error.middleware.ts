import { NextFunction, Request, Response } from 'express';
import configs from '../../config';
import { GRAPHQL_ROUTE } from '../../utils/constants.util';
import { NotFound, convertUnknownIntoError } from '../../utils/errors.util';

export function notFound(req: Request, res: Response, next: NextFunction) {
	if (GRAPHQL_ROUTE === req.path) return next();

	const err = new NotFound();
	next(err);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(e: unknown, req: Request, res: Response, next: NextFunction) {
	const err = convertUnknownIntoError(e);
	res.locals.error = err;

	res.status(err.status);
	res.json({
		message: err.message,
		stack: configs.app.inProd ? '🥞' : err.stack,
	});
}
