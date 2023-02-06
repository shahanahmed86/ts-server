import { Request } from 'express';
import { HasToken } from '../../@types/middleware.type';
import { BadRequest, NotAuthorized } from '../../utils/errors.util';

const hasToken: HasToken = (req) => req.headers.authorization;

export const guestController = (req: Request): void | Promise<void> => {
	const token = hasToken(req);
	if (token) throw new BadRequest('You are already logged in');
};

export const authController = (key: string, req: Request): void | Promise<void> => {
	const token = hasToken(req);
	if (!token) throw new NotAuthorized('You must be logged in');

	console.log({ key, token });
};
