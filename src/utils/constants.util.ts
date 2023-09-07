import configs from '../config';

const { expiry } = configs.jwt.access;

export const GRAPHQL_ROUTE = '/graphql';

export const SHOULD_OMIT_PROPS = [
	'isSuper',
	'password',
	'deletedAt',
	'deletedBy',
	'deletedById',
	'emailVerified',
	'phoneVerified',
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

export const ONE_SECOND = 1000;

export const JWT_ACCESS_EXPIRY_IN_SECONDS = +expiry / ONE_SECOND;

export const SIZE_LIMIT = 10 * 1024 * 1024;

export const TEMP_FOLDER_PATH = './uploads/temp';

export const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

export const PHONE_REGEX =
	/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

export const LIMIT = '10';

export const OFFSET = '1';

export const CHUNK_SIZE = 5000;

export const ROLES = {
	admin: 'admin',
	user: 'user',
};

export const LANGUAGES = ['en'];

export const LANGUAGE_HEADER = 'LANGUAGE';

export const SESSION_MAX_AGE = 1000 * 60; // 30 seconds
