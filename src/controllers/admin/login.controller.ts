import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { loginSchema } from '../../validation';

export const login: Controller<AuthPayload, LoginArgs> = async (_, args, { req, res }) => {
	await joiValidator(loginSchema, args);

	const admin = await Dao.admin.findOne({
		where: { email: args.email, role: Dao.admin.preDeleteParams() },
		relations: { role: true },
	});
	if (!admin) throw new NotAuthenticated();

	if (admin.role!.name !== res.locals.role) {
		throw new NotAuthorized(['auth.insufficientPriviledge', admin.role!.name]);
	}

	const isMatched = admin.comparePassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	const payload = await admin.postLogin(admin.role!.name);

	console.log(req.session);
	console.log(req.sessionID);
	console.log(req.sessionStore);

	req.session.user = payload;

	return payload;
};
