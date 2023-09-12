import { GraphQLError } from 'graphql';
import { ContextFunction, Controller, ControllerFunction } from '../@types/wrapper.type';
import { convertUnknownIntoError } from './errors.util';
import { formatResponse } from './logics.util';
import { translate } from '../library/i18n.library';

export function restWrapper<T, S>(
	controller: Controller<T, S>,
	message: string,
	status = 200,
): ContextFunction {
	return async (req, res, next) => {
		try {
			const root = null;
			const args = Object.assign({}, req.params, req.query, req.body);
			const context = { req, res, next };

			const payload = await controller(root, args, context);
			const result = formatResponse(status, message, payload);
			res.status(result.status).send(result);
		} catch (e) {
			const error = convertUnknownIntoError(e);
			next(error);
		}
	};
}

export function graphqlWrapper<T, S>(controller: Controller<T, S>): ControllerFunction<T, S> {
	return async (...args) => {
		try {
			const result = await controller(...args);

			return (typeof result === 'string' ? translate(result) : result) as T;
		} catch (e) {
			const error = convertUnknownIntoError(e);
			throw new GraphQLError(error.message, { extensions: { code: error.status } });
		}
	};
}
