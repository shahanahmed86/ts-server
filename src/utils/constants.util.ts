import { JWT_EXPIRY } from '../config';

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

export const JWT_EXPIRY_IN_SECONDS = JWT_EXPIRY / 1000;

export const SIZE_LIMIT = 10 * 1024 * 1024;

export const NO_OR_INVALID_SESSION = 'No or invalid session';

export const TEMP_FOLDER_PATH = './uploads/temp';

export const EMAIL_REGEX = '^[A-Za-z0-9._+%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$';

export const PASSWORD_REGEX = '^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

export const PHONE_REGEX =
	'^s*(?:+?(d{1,3}))?([-. (]*(d{3})[-. )]*)?((d{3})[-. ]*(d{2,4})(?:[-.x ]*(d+))?)s*$';
