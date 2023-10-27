import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { includGenderModel, includeRoleModel, maskPassword } from '../../utils/db.utils';
import { NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { notVerifiedUser, validateRequest } from '../../utils/logics.util';
import { Login } from '../../validations';

export const login: Controller<AuthPayload, LoginArgs> = async (_, _args, { req, res }) => {
	const args = await validateRequest(Login, _args);
	const roleName = res.locals.role!;

	const userDao = new Dao.User();

	const user = await userDao.findOne(
		{ email: args.email },
		{ populate: [includeRoleModel(roleName), includGenderModel()] },
	);
	if (!user) throw new NotAuthenticated();
	if (!user.role) throw new NotAuthorized(['auth.insufficientPriviledge', roleName]);

	const isMatched = user.matchPassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	const notVerified = notVerifiedUser(user);
	if (notVerified) throw new NotAuthorized('auth.verifyEmail');

	const payload = { userId: user.id, role: roleName };
	req.session.payload = payload;

	user.password &&= maskPassword(user.password);
	return user;
};
