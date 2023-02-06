import { ContextFunction } from '../../@types/wrapper.type';
import { authController, guestController } from '../../controllers/middleware/auth.controller';
import { restCatch } from '../../utils/errors.util';

export const guest: ContextFunction = async (req, res, next) => {
	try {
		await guestController(req);

		next();
	} catch (e) {
		restCatch(e, res);
	}
};

export const auth = (key: string): ContextFunction => {
	return async (req, res, next) => {
		try {
			await authController(key, req);

			next();
		} catch (e) {
			restCatch(e, res);
		}
	};
};
