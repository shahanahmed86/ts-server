import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { Login } from '../../validations';

export const login: Controller<AuthPayload, LoginArgs> = async (_, _args, { req, res }) => {
	const args = await validateRequest(Login, _args);

	const adminDao = new Dao.Admin();

	const admin = await adminDao.findOne({
		where: { email: args.email, role: adminDao.preDeleteParams() },
		relations: { role: true },
	});
	if (!admin) throw new NotAuthenticated();

	if (admin.role!.name !== res.locals.role) {
		throw new NotAuthorized(['auth.insufficientPriviledge', admin.role!.name]);
	}

	const isMatched = admin.comparePassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	const payload = { userId: admin.id, role: admin.role!.name };

	req.session.payload = payload;

	return admin;
};
