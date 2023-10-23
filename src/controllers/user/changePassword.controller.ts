import { ChangePasswordArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { compareSync, hashSync } from '../../library/bcrypt.library';
import { UserSchema } from '../../database/schemas/user.schema';
import { ConflictError } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { ChangePassword } from '../../validations';

export const changePassword: Controller<string, ChangePasswordArgs> = async (_, _args, { res }) => {
	const args = await validateRequest(ChangePassword, _args);

	const user = res.locals.user as UserSchema;

	const isMatched = compareSync(args.oldPassword, user.password);
	if (!isMatched) throw new ConflictError('auth.oldPasswordMismatched');

	const isPasswordRepeated = args.oldPassword === args.password;
	if (isPasswordRepeated) throw new ConflictError('auth.repeatedPassword');

	const password = hashSync(args.password);
	const userDao = new Dao.User();

	const isUpdated = await userDao.update(user.id.toString(), { password });
	if (!isUpdated) throw new ConflictError('auth.changePasswordFailed');

	return 'auth.changePassword';
};
