import { AuthPayload, LoginArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { NotAuthenticated } from '../../utils/errors.util';
import { formatResponse, joiValidator } from '../../utils/logics.util';
import { loginSchema } from '../../validation';

export const login: Controller<AuthPayload> = async (_, args: LoginArgs) => {
	await joiValidator(loginSchema, args);

	const user = await Dao.users.findOne({
		where: { email: args.email },
		relations: { role: true },
	});
	if (!user) throw new NotAuthenticated();

	const isMatched = user.comparePassword(args.password);
	if (!isMatched) throw new NotAuthenticated();

	const payload = await user.postLogin(user.role!.name);

	return formatResponse(200, "You've your login session", payload);
};
