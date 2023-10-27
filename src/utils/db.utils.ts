import { PopulateOptions } from 'mongoose';
import { GENDER_TABLE, ROLE_TABLE } from '../database/constants';
import { ExtendedBaseDocument as BaseDocument } from '../database/schemas/base.schema';
import { COMMON_OMIT_FIELDS } from './constants.util';

export const maskPassword = (password: string) => Array(password.length).fill('*').join('');

export const getDeleteParams = (): Partial<BaseDocument> => ({ deletedAt: null, deletedBy: null });

const match = getDeleteParams();
export const includeRoleModel = (name?: string): PopulateOptions => ({
	path: ROLE_TABLE,
	select: COMMON_OMIT_FIELDS,
	match: name ? { ...match, name } : match,
});
export const includGenderModel = (name?: string): PopulateOptions => ({
	path: GENDER_TABLE,
	select: COMMON_OMIT_FIELDS,
	match: name ? { ...match, name } : match,
});
