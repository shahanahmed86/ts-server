import { randomUUID } from 'crypto';
import { ObjectSchema } from 'joi';
import { isArray, isObject, omit } from 'radash';
import { Result } from '../@types/wrapper.type';
import { SHOULD_OMIT_PROPS } from './constants.util';
import { convertUnknownIntoError } from './errors.util';

export const formatResponse = <T>(status: number, message: string, data: T): Result<T> => {
	return { status, message, data: omitProps<T>(data) };
};

export const getUniqueId = () => randomUUID();

export async function joiValidator<T>(schema: ObjectSchema<T>, payload: T): Promise<void> {
	try {
		await schema.validateAsync(payload, { abortEarly: false });
	} catch (e) {
		throw convertUnknownIntoError(e);
	}
}

export function omitProps<T>(payload: T): T {
	if (!payload || (!isObject(payload) && !isArray(payload))) return payload;

	if (isArray(payload)) {
		for (let i = 0; i < payload.length; i++) {
			const value = payload[i];
			if (!isObject(value) && !isArray(value)) continue;

			payload[i] = omitProps(value);
		}
	} else {
		for (const key in payload) {
			const value = payload[key];
			if (!isObject(value) && !isArray(value)) continue;

			if (isObject(value)) {
				payload[key] = omitProps(value);
			} else {
				for (let i = 0; i < value['length' as keyof Array<any>]; i++) {
					if (!isObject(value[i]) && !isArray(value[i])) continue;

					payload[key as keyof object][i] = omitProps(payload[key as keyof object][i]);
				}
			}
		}
	}

	return omit(payload, SHOULD_OMIT_PROPS as never[]);
}
