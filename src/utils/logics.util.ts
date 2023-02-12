import { randomUUID } from 'crypto';
import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';
import isObject from 'lodash/isObject';
import omit from 'lodash/omit';
import { FormatResponse } from '../@types/api.type';
import { JoiValidator } from '../@types/library.type';
import { SHOULD_OMIT_PROPS } from './constants.util';
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

export const omitProps = <T>(payload: T, props: string[] = SHOULD_OMIT_PROPS): T => {
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
};
