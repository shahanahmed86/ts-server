import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { RoleDocument } from '../../database/schemas';
import { NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { notVerifiedUser, validateRequest } from '../../utils/logics.util';
import { Login } from '../../validations';

export const login: Controller<AuthPayload, LoginArgs> = async (_, _args, { req, res }) => {
	const args = await validateRequest(Login, _args);

	const userDao = new Dao.User();
	const user = await userDao.findOne(
		{ email: args.email, role: { deletedAt: null, deletedBy: null } },
		{ populate: ['role', 'gender'] },
	);
	if (!user) throw new NotAuthenticated();

	const role = user.role as RoleDocument;
	if (role.name !== res.locals.role) {
		throw new NotAuthorized(['auth.insufficientPriviledge', role.name]);
	}

	const isMatched = user.matchPassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	const notVerified = notVerifiedUser(user);
	if (notVerified) throw new NotAuthorized('auth.verifyEmail');

	const payload = { userId: user.id, role: role.name };

	req.session.payload = payload;

	return user;
};
