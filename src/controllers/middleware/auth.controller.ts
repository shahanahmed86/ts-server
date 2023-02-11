import {
	AuthController,
	GuestController,
	HasToken,
	ValidateToken
} from '../../@types/middleware.type';
import * as Dao from '../../dao';
import { decodePayload } from '../../library/jwt.library';
import { ROLES_DATA } from '../../typeorm/constants';
import { MS, NO_OR_INVALID_SESSION } from '../../utils/constants.util';
import { BadRequest, NotAuthenticated, NotAuthorized } from '../../utils/errors.util';

const hasToken: HasToken = (req) => req.headers.authorization;

const validateToken: ValidateToken = async (bearerToken, key) => {
	const isValidRole = ROLES_DATA.some((role) => role.name === key);
	if (!isValidRole) throw new BadRequest(`${key} is an invalid role`);

	if (!bearerToken.includes('Bearer ')) throw new NotAuthenticated(NO_OR_INVALID_SESSION);

	const token = bearerToken.split(' ')[1];

	const payload = await decodePayload(token);
	if (!payload) throw new NotAuthenticated(NO_OR_INVALID_SESSION);

	if (typeof payload.exp === 'number') {
		const now = Date.now() / MS;
		const isSessionExpired = payload.exp <= now;
		if (isSessionExpired) throw new NotAuthenticated(NO_OR_INVALID_SESSION);
	}

	return payload[key];
};

export const guestController: GuestController = (req) => {
	const token = hasToken(req);
	if (token) throw new BadRequest('You are already logged in');
};

export const authController: AuthController = async (key, req, res) => {
	const token = hasToken(req);
	if (!token) throw new NotAuthorized('You must be logged in');

	const userId = await validateToken(token, key);

	const user = await Dao.users.findOne({
		where: { id: userId },
		relations: { role: true },
	});
	if (!user) throw new NotAuthenticated();
	if (user.role!.name !== key) throw new NotAuthorized();

	res.locals.user = user;
};
