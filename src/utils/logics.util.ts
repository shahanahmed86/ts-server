import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';
import isObject from 'lodash/isObject';
import omit from 'lodash/omit';
import { FormatResponse, UserArgs } from '../@types/api.type';
import { translate } from '../library/i18n.library';
import { SHOULD_OMIT_PROPS } from './constants.util';
import { ZodValidator } from '../@types/library.type';

export const formatResponse: FormatResponse = (status, message, data) => {
	return { status, message: translate(message), data: omitProps(data) };
};

export const getISODate = (dt: string | Date | number = Date.now()) => new Date(dt).toISOString();

export const getUniqueId = () => randomUUID();

export function validateRequest<T, A>(validators: ZodValidator<T>, args: A) {
	return validators.parseAsync(args) as Promise<A>;
}

export function notVerifiedUser<T>(user: T extends UserArgs ? T : UserArgs): boolean {
	return !user.emailVerified && !user.phoneVerified;
}

export function omitProps<T>(payload: T, props: string[] = SHOULD_OMIT_PROPS): T {
	if (isArray(payload)) {
		for (let i = 0; i < payload.length; i++) {
			const value = payload[i];

			if (isObject(value)) payload[i] = omitProps(value, props);
			if (isArray(value)) payload[i] = omitProps(value, props);
		}
	} else if (isObject(payload)) {
		for (const key in payload) {
			const value = payload[key];

			if (isArray(value)) payload[key] = omitProps(value, props);
			else if (isDate(value)) payload[key] = value;
			else if (isObject(value)) payload[key] = omitProps(value, props);
		}

		return omit(payload, props) as T;
	}

	return payload;
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
