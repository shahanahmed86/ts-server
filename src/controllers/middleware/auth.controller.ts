import {
	AuthController,
	GuestController,
	HasToken,
	ValidateToken,
} from '../../@types/middleware.type';
import * as Dao from '../../dao';
import { translate } from '../../library/i18n.library';
import { decodePayload } from '../../library/jwt.library';
import { ROLES_DATA } from '../../typeorm/constants';
import { MS } from '../../utils/constants.util';
import {
	BadRequest,
	ConflictError,
	NotAuthenticated,
	NotAuthorized,
} from '../../utils/errors.util';

const hasToken: HasToken = (req) => req.headers.authorization;

const validateToken: ValidateToken = async (bearerToken, key) => {
	const isValidRole = ROLES_DATA.some((role) => role.name === key);
	if (!isValidRole) throw new BadRequest(['auth.invalidRole', key]);

	if (!bearerToken.includes('Bearer ')) {
		throw new NotAuthenticated(translate('auth.invalidSession'));
	}

	const token = bearerToken.split(' ')[1];

	const payload = await decodePayload(token);
	if (!payload) throw new NotAuthenticated(translate('auth.invalidSession'));

	if (typeof payload.exp === 'number') {
		const now = Date.now() / MS;
		const isSessionExpired = payload.exp <= now;
		if (isSessionExpired) throw new NotAuthenticated(translate('auth.invalidSession'));
	}

	return payload[key];
};

export const guestController: GuestController = (req) => {
	const token = hasToken(req);
	if (token) throw new BadRequest(translate('auth.alreadyLoggedIn'));
};

export const authController: AuthController = async (key, req, res) => {
	const token = hasToken(req);
	if (!token) throw new NotAuthorized('auth.requiredLogin');

	const userId = await validateToken(token, key);

	const user = await Dao.users.findOne({
		where: { id: userId },
		relations: { role: true, gender: true },
	});
	if (!user) throw new NotAuthenticated();
	if (user.role!.name !== key) throw new NotAuthorized();
	if (!user.emailVerified) throw new ConflictError('auth.verifyEmail');

	res.locals.user = user;
};
