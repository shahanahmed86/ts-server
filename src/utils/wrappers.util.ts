import { ContextFunction, Controller, Result } from '../@types/wrapper.type';
import { restCatch } from './errors.util';

export function restWrapper<T>(controller: Controller<T>): ContextFunction {
	return async (req, res, next) => {
		try {
			const root = null;
			const args = Object.assign({}, req.params, req.query, req.body);
			const context = { req, res, next };

			const result = await controller(root, args, context);
			res.status(result.status).send(result);
		} catch (e) {
			restCatch(e, res);
		}
	};
}
