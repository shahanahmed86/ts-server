import { AuthPayload, UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { ConflictError, NotFound } from '../../utils/errors.util';
import { formatResponse, joiValidator } from '../../utils/logics.util';
import { signupSchema } from '../../validation';

export const signup: Controller<AuthPayload> = async (_, args: UserArgs) => {
	await joiValidator(signupSchema, args);

	const user = await Dao.users.findOne({ where: { email: args.email! } });
	if (user) throw new ConflictError('User already exists with this email address');

	const role = await Dao.roles.findOne({ where: { name: 'user' } });
	if (!role) throw new NotFound('Role not found');

	args.roleId = role.id;
	const data = await Dao.users.signup(args, role.name);

	return formatResponse(201, "You've successfully signed up", data);
};
