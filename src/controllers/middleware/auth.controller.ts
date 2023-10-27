import {
	AuthController,
	GuestController,
	HasSession,
	ValidateToken,
} from '../../@types/middleware.type';
import * as Dao from '../../dao';
import { decodePayload } from '../../library/jwt.library';
import { ONE_SECOND } from '../../utils/constants.util';
import { includGenderModel, includeRoleModel } from '../../utils/db.utils';
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

	if (role === 'admin') {
		const dao = new Dao.Admin();

		const admin = await dao.findOne({ _id: userId }, { populate: [includeRoleModel(key)] });
		if (!admin || !admin.role) throw new NotAuthenticated();

		res.locals.admin = admin;
	} else {
		const dao = new Dao.User();
		const user = await dao.findOne(
			{ _id: userId },
			{ populate: [includeRoleModel(key), includGenderModel()] },
		);
		if (!user || !user.role) throw new NotAuthenticated();

		const isUnverifiedUser = notVerifiedUser(user);
		if (isUnverifiedUser) throw new NotAuthorized('auth.verifyEmail');

		res.locals.user = user;
	}
};
