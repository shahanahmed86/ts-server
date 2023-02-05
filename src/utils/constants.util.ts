import { JWT_EXPIRY } from '../config';

export const OMIT_COLUMNS: string[] = [
	'password',
	'isDeleted',
	'deletedAt',
	'deletedBy',
	'deletedById',
];

export const MORGAN_TOKENS: string = [
	':host',
	':date[iso]',
	':method',
	':remote-addr',
	':status',
	':url',
	':user-agent',
	':response-time',
	':error',
].join(' ');

export type GenderOption = 'MALE' | 'FEMALE' | 'PREFER_NOT_TO_SAY';
export const GENDER_OPTIONS: GenderOption[] = ['MALE', 'FEMALE', 'PREFER_NOT_TO_SAY'];

export type LoginType = 'LOCAL' | 'FACEBOOK' | 'GOOGLE';
export const LOGIN_TYPES: LoginType[] = ['LOCAL', 'FACEBOOK', 'GOOGLE'];

export const JWT_EXPIRY_IN_SECONDS = JWT_EXPIRY / 1000;

export const SIZE_LIMIT = 10 * 1024 * 1024;
