import { Request, Response, NextFunction } from 'express';
import { restCatch } from './errors.util';

export type Context = {
	req: Request;
	res: Response;
	next: NextFunction;
};

export type Controller<T, S> = (root: null | undefined, args: T, context: Context) => Promise<S>;

export type Result = {
	status: number;
	message: string;
};

export const restWrapper =
	<T, S extends Result>(controller: Controller<T, string | S>) =>
	async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const args = Object.assign({}, req.params, req.query, req.body);
			const context = { req, res, next };

			const result = await controller(null, args, context);

			if (typeof result === 'string') res.send(result);
			else res.status(result.status).send(result);
		} catch (e) {
			restCatch(e, res);
		}
	};
