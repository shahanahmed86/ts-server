import { randomUUID } from 'crypto';
import isArray from 'lodash/isArray';
import isDate from 'lodash/isDate';
import isObject from 'lodash/isObject';
import omit from 'lodash/omit';
import { FormatResponse } from '../@types/api.type';
import { JoiValidator } from '../@types/library.type';
import { translate } from '../library/i18n.library';
import { SHOULD_OMIT_PROPS } from './constants.util';
import { convertUnknownIntoError } from './errors.util';
import { DeepPartial, QueryRunner } from 'typeorm';
import { Head } from '../typeorm/entities/head.entity';
import { HEAD_TABLE } from '../typeorm/constants';

export const formatResponse: FormatResponse = (status, message, data) => {
	return { status, message: translate(message), data: omitProps(data) };
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

export async function defaultHeads(
	queryRunner: QueryRunner,
	_data: DeepPartial<Head[]>,
): Promise<void> {
	await queryRunner.manager.createQueryBuilder(Head, HEAD_TABLE).insert().values(_data).execute();

	for (const data of _data) {
		if (!data.children || !Array.isArray(data.children)) continue;

		const l = data.children.length;
		for (let i = 0; i < l; i++) data.children[i].parentId = data.id;

		await defaultHeads(queryRunner, data.children);
	}
}
