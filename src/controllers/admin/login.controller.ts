import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { includeRoleModel, maskPassword } from '../../utils/db.utils';
import { NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { Login } from '../../validations';

export const login: Controller<AuthPayload, LoginArgs> = async (_, _args, { req, res }) => {
	const args = await validateRequest(Login, _args);
	const roleName = res.locals.role!;

	const adminDao = new Dao.Admin();

	const admin = await adminDao.findOne(
		{ email: args.email },
		{ populate: [includeRoleModel(roleName)] },
	);
	if (!admin) throw new NotAuthenticated();
	if (!admin.role) throw new NotAuthorized(['auth.insufficientPriviledge', roleName]);

	const isMatched = admin.matchPassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	const payload = { userId: admin.id, role: roleName };
	req.session.payload = payload;

	admin.password &&= maskPassword(admin.password);
	return admin;
};
