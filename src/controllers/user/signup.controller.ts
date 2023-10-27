import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { UserDocument } from '../../database/schemas';
import { hashSync } from '../../library/bcrypt.library';
import { translate } from '../../library/i18n.library';
import { ConflictError, NotFound } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { SignUp } from '../../validations';

export const signup: Controller<string, UserArgs> = async (_, _args, { res }) => {
	const { password, ...args } = await validateRequest(SignUp, _args);

	const userDao = new Dao.User();

	const user = await userDao.findOne({ email: args.email });
	if (user) throw new ConflictError('auth.userExists');

	const roleDao = new Dao.Role();

	const role = await roleDao.findOne({ name: res.locals.role });
	if (!role) throw new NotFound(['common.notFound', 'Role']);

	args.role = role._id;

	const genderDao = new Dao.Gender();

	const gender = await genderDao.exists({ _id: args.gender });
	if (!gender) throw new NotFound(['common.notFound', 'Gender']);

	Object.assign(args, { password: hashSync(password!) });
	await userDao.signup(args as UserDocument);

	return translate('auth.signup');
};
