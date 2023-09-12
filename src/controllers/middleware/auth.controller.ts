import {
	AuthController,
	GuestController,
	HasSession,
	ValidateToken,
} from '../../@types/middleware.type';
import * as Dao from '../../dao';
import { Admin as AdminDao, User as UserDao } from '../../dao';
import { decodePayload } from '../../library/jwt.library';
import { User } from '../../typeorm/entities/user.entity';
import { ONE_SECOND } from '../../utils/constants.util';
import { BadRequest, NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { notVerifiedUser } from '../../utils/logics.util';

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

	let dao: UserDao | AdminDao;
	if (role === 'admin') dao = new Dao.Admin();
	else dao = new Dao.User();

	const user = await dao.findOne({
		where: { id: userId, role: { name: role } },
		relations: { role: true },
	});
	if (!user) throw new NotAuthenticated();

	const isUnverifiedUser = user instanceof User && notVerifiedUser(user);
	if (isUnverifiedUser) throw new NotAuthorized('auth.verifyEmail');

	res.locals.user = user;
};
