import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { ConflictError, NotFound } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { SignUp } from '../../validations';

export const signup: Controller<string, UserArgs> = async (_, _args, { res }) => {
	const args = await validateRequest(SignUp, _args);

	const userDao = new Dao.User();

	const user = await userDao.findOne({ where: { email: args.email! } });
	if (user) throw new ConflictError('auth.userExists');

	const roleDao = new Dao.Role();

	const role = await roleDao.findOne({ where: { name: res.locals.role } });
	if (!role) throw new NotFound(['common.notFound', 'Role']);

	args.roleId = role.id;

	await userDao.signup(args);

	return 'auth.signup';
};
