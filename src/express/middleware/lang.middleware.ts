import { NextFunction, Request, Response } from 'express';
import controllers from '../../controllers';
import { restCatch } from '../../utils/errors.util';

export const checkLanguage = (req: Request, res: Response, next: NextFunction) => {
	try {
		controllers.middleware.checkLanguage(req, res);

		next();
	} catch (e) {
		restCatch(e, res);
	}
};
