import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { loginSchema } from '../../validation';

export const login: Controller<AuthPayload, LoginArgs> = async (_, args, { req, res }) => {
	await joiValidator(loginSchema, args);

	const user = await Dao.user.findOne({
		where: { email: args.email, role: Dao.user.preDeleteParams() },
		relations: { role: true, gender: true },
	});
	if (!user) throw new NotAuthenticated();

	if (user.role!.name !== res.locals.role) {
		throw new NotAuthorized(['auth.insufficientPriviledge', user.role!.name]);
	}

	const isMatched = user.comparePassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	const payload = { userId: user.id, role: user.role!.name };

	req.session.payload = payload;

	return user;
};
