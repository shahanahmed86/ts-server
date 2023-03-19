import {
	AuthController,
	GuestController,
	HasToken,
	ValidateToken,
} from '../../@types/middleware.type';
import * as Dao from '../../dao';
import { decodePayload } from '../../library/jwt.library';
import { MS } from '../../utils/constants.util';
import {
	BadRequest,
	ConflictError,
	NotAuthenticated,
	NotAuthorized,
} from '../../utils/errors.util';

const hasToken: HasToken = (req) => req.headers.authorization;

const validateToken: ValidateToken = async (bearerToken, key) => {
	const role = await Dao.role.findOne({ where: { name: key } });
	if (!role) throw new BadRequest(['auth.invalidRole', key]);

	if (!bearerToken.includes('Bearer ')) {
		throw new NotAuthenticated('auth.invalidSession');
	}

	const token = bearerToken.split(' ')[1];

	const payload = await decodePayload(token);
	if (!payload) throw new NotAuthenticated('auth.invalidSession');

	if (typeof payload.exp === 'number') {
		const now = Date.now() / MS;
		const isSessionExpired = payload.exp <= now;
		if (isSessionExpired) throw new NotAuthenticated('auth.invalidSession');
	}

	return payload[key];
};

export const guestController: GuestController = (req) => {
	const token = hasToken(req);
	if (token) throw new BadRequest('auth.alreadyLoggedIn');
};

export const authController: AuthController = async (key, req, res) => {
	const token = hasToken(req);
	if (!token) throw new NotAuthorized('auth.requiredLogin');

	const userId = await validateToken(token, key);

	let userPayload;

	switch (key) {
		case 'admin': {
			const admin = await Dao.admin.findOne({
				where: { id: userId },
				relations: { role: true },
			});
			if (!admin) throw new NotAuthenticated();

			userPayload = admin;
			break;
		}
		case 'user': {
			const user = await Dao.user.findOne({
				where: { id: userId },
				relations: { role: true, gender: true },
			});
			if (!user) throw new NotAuthenticated();
			if (user.role!.name !== key) throw new NotAuthorized();
			if (!user.emailVerified) throw new ConflictError('auth.verifyEmail');

			userPayload = user;
			break;
		}
		default: {
			throw new NotAuthorized();
		}
	}

	res.locals.user = userPayload;
};
