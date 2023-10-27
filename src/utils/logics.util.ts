import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { FormatResponse, UserArgs } from '../@types/api.type';
import { ZodValidator } from '../@types/library.type';
import { translate } from '../library/i18n.library';

export const formatResponse: FormatResponse = (status, message, data) => {
	return { status, message: translate(message), data };
};

export const getISODate = (dt: string | Date | number = Date.now()) => new Date(dt).toISOString();

export const getUniqueId = () => randomUUID();

export function validateRequest<T, A extends object>(validators: ZodValidator<T>, args: A) {
	return validators.parseAsync(args) as Promise<A>;
}

export function notVerifiedUser<T>(user: T extends UserArgs ? T : UserArgs): boolean {
	return !user.emailVerified && !user.phoneVerified;
}

export function clearSession(req: Request, res: Response): Promise<void> {
	return new Promise((resolve, reject) => {
		req.session.destroy((err: Error) => {
			if (err) reject(err);

			res.clearCookie(`sess:${req.sessionID}`);

			resolve();
		});
	});
}
