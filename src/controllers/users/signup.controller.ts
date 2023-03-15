import { AuthPayload, UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { ConflictError, NotFound } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { signupSchema } from '../../validation';

export const signup: Controller<AuthPayload, UserArgs> = async (_, args, { res }) => {
	await joiValidator(signupSchema, args);

	const user = await Dao.users.findOne({ where: { email: args.email! } });
	if (user) throw new ConflictError('User already exists with this email address');

	const role = await Dao.roles.findOne({ where: { name: res.locals.role } });
	if (!role) throw new NotFound('Role not found');

	args.roleId = role.id;
	return Dao.users.signup(args, role.name);
};
