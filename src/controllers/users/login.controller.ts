import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { loginSchema } from '../../validation';

export const login: Controller<AuthPayload, LoginArgs> = async (_, args, { res }) => {
	await joiValidator(loginSchema, args);

	const user = await Dao.users.findOne({
		where: { email: args.email, role: Dao.users.deleteParams },
		relations: { role: true, gender: true },
	});
	if (!user) throw new NotAuthenticated();

	if (user.role!.name !== res.locals.role) {
		throw new NotAuthorized(['auth.insufficientPriviledge', user.role!.name]);
	}

	const isMatched = user.comparePassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	return user.postLogin(user.role!.name);
};
