import { ContextFunction } from '../../@types/wrapper.type';
import controllers from '../../controllers';
import { restCatch } from '../../utils/errors.util';

export const guest: ContextFunction = (req, res, next) => {
	try {
		controllers.middleware.guestController(req);

		next();
	} catch (e) {
		restCatch(e, res);
	}
};

export const auth = (key: string): ContextFunction => {
	return async (req, res, next) => {
		try {
			await controllers.middleware.authController(key, req, res);

			next();
		} catch (e) {
			restCatch(e, res);
		}
	};
};

export const includeRole = (key: string): ContextFunction => {
	return (req, res, next) => {
		res.locals.role = key;
		next();
	};
};
