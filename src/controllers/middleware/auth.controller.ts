import {
	AuthController,
	GuestController,
	HasSession as HasSession,
	ValidateToken,
} from '../../@types/middleware.type';
import * as Dao from '../../dao';
import { decodePayload } from '../../library/jwt.library';
import { User } from '../../typeorm/entities/user.entity';
import { ONE_SECOND } from '../../utils/constants.util';
import {
	BadRequest,
	ConflictError,
	NotAuthenticated,
	NotAuthorized,
} from '../../utils/errors.util';

const hasSession: HasSession = (req) => req.session.payload;

export const validateToken: ValidateToken = async (token) => {
	const payload = await decodePayload(token);
	if (!payload) throw new NotAuthenticated('auth.invalidSession');

	if (typeof payload.exp === 'number') {
		const now = Date.now() / ONE_SECOND;
		const isSessionExpired = payload.exp <= now;
		if (isSessionExpired) throw new NotAuthenticated('auth.invalidSession');
	}

	return payload;
};

export const guestController: GuestController = (req) => {
	const payload = hasSession(req);
	if (payload) throw new BadRequest('auth.alreadyLoggedIn');
};

export const authController: AuthController = async (key, req, res) => {
	const payload = hasSession(req);
	if (!payload) throw new NotAuthorized('auth.requiredLogin');

	const { userId, role } = payload;

	if (!role || role !== key) throw new NotAuthorized();

	const user = await Dao[role].findOne({
		where: { id: userId, role: { name: role } },
		relations: { role: true },
	});
	if (!user) throw new NotAuthenticated();

	const isUnverifiedUser = user instanceof User && !user.emailVerified;
	if (isUnverifiedUser) throw new ConflictError('auth.verifyEmail');

	res.locals.user = user;
};
