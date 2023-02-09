import { randomUUID } from 'crypto';
import { ObjectSchema } from 'joi';
import { FormResponse } from '../@types/common.types';
import { convertUnknownIntoError } from './errors.util';

export const formResponse: FormResponse = (status, message, data) => ({ status, message, data });

export const getUniqueId = () => randomUUID();

export async function joiValidator<T>(schema: ObjectSchema, payload: T): Promise<void> {
	try {
		await schema.validateAsync(payload, { abortEarly: false });
	} catch (e) {
		throw convertUnknownIntoError(e);
	}
}
