import { NextFunction, Request, Response } from 'express';
import controllers from '../../controllers';

export const guest = (req: Request, res: Response, next: NextFunction) => {
	try {
		controllers.middleware.guestController(req);

		next();
	} catch (e) {
		next(e);
	}
};

export const auth = (key: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await controllers.middleware.authController(key, req, res);

			next();
		} catch (e) {
			next(e);
		}
	};
};

export const includeRole = (key: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		res.locals.role = key;
		next();
	};
};
