import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { NotAuthenticated, NotAuthorized } from '../../utils/errors.util';
import { formatResponse, joiValidator } from '../../utils/logics.util';
import { loginSchema } from '../../validation';

export const login: Controller<AuthPayload, LoginArgs> = async (_, args, { res }) => {
	await joiValidator(loginSchema, args);

	const user = await Dao.users.findOne({
		where: { email: args.email, role: Dao.users.deleteParams },
		relations: { role: true },
	});
	if (!user) throw new NotAuthenticated();

	if (user.role!.name !== res.locals.role) {
		throw new NotAuthorized(`A user with ${user.role!.name} role cannot login from here`);
	}

	const isMatched = user.comparePassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	const payload = await user.postLogin(user.role!.name);

	return formatResponse(200, "You've your login session", payload);
};
