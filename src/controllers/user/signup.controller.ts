import { AuthPayload, UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { ConflictError, NotFound } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { signupSchema } from '../../validation';

export const signup: Controller<AuthPayload, UserArgs> = async (_, args, { res }) => {
	await joiValidator(signupSchema, args);

	const userDao = new Dao.User();

	const user = await userDao.findOne({ where: { email: args.email! } });
	if (user) throw new ConflictError('auth.userExists');

	const roleDao = new Dao.Role();

	const role = await roleDao.findOne({ where: { name: res.locals.role } });
	if (!role) throw new NotFound(['common.notFound', 'Role']);

	args.roleId = role.id;
	const payload = await userDao.signup(args);

	return payload;
};
