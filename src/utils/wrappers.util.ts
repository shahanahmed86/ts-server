import { GraphQLError } from 'graphql';
import { ContextFunction, Controller, ControllerFunction } from '../@types/wrapper.type';
import { convertUnknownIntoError } from './errors.util';

export function restWrapper<T, S>(controller: Controller<T, S>): ContextFunction<T> {
	return (req, res, next) => {
		const root = null;
		const args = Object.assign({}, req.params, req.query, req.body);
		const context = { req, res, next };

		return controller(root, args, context);
	};
}

export function graphqlWrapper<T, S>(controller: Controller<T, S>): ControllerFunction<T, S> {
	return async (...args) => {
		try {
			return await controller(...args);
		} catch (e) {
			const error = convertUnknownIntoError(e);
			throw new GraphQLError(error.message, { extensions: { code: error.status } });
		}
	};
}
