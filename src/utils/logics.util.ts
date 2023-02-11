import { randomUUID } from 'crypto';
import { isDate, omit } from 'radash';
import { FormatResponse } from '../@types/api.type';
import { JoiValidator } from '../@types/library.type';
import { NEITHER_OBJECT_NOR_ARRAY, SHOULD_OMIT_PROPS } from './constants.util';
import { convertUnknownIntoError } from './errors.util';

export const formatResponse: FormatResponse = (status, message, data) => {
	return { status, message, data: omitProps(data) };
};

export const getISODate = (dt: string | Date | number = Date.now()) => new Date(dt).toISOString();

export const getUniqueId = () => randomUUID();

export const joiValidator: JoiValidator = async (schema, payload) => {
	try {
		await schema.validateAsync(payload, { abortEarly: false });
	} catch (e) {
		throw convertUnknownIntoError(e);
	}
};

export function omitProps<T>(payload: T): T {
	if (!payload) return payload;

	const isIrrelevant = NEITHER_OBJECT_NOR_ARRAY.includes(typeof payload);
	if (isIrrelevant) return payload;

	if (Array.isArray(payload)) {
		for (let i = 0; i < payload.length; i++) {
			const value = payload[i];

			if (isObject(value)) payload[i] = omitProps(value);
			else if (Array.isArray(value)) payload[i] = omitProps(payload[i]);
		}
	} else if (isObject(payload)) {
		for (const key in payload) {
			const value = payload[key];

			if (isObject(value)) payload[key] = omitProps(value);
			else if (Array.isArray(value)) {
				payload[key as keyof object] = omitProps(payload[key as keyof object]);
			}
		}
	}

	return omit(payload, SHOULD_OMIT_PROPS as never[]);
}

export function isObject<T>(payload: T): boolean {
	return typeof payload === 'object' && !Array.isArray(payload) && !isDate(payload);
}
