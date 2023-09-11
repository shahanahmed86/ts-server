import { ChangePasswordArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { hashSync } from '../../library/bcrypt.library';
import { translate } from '../../library/i18n.library';
import { User } from '../../typeorm/entities/user.entity';
import { ConflictError } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { changePasswordSchema } from '../../validation';

export const changePassword: Controller<string, ChangePasswordArgs> = async (_, args, { res }) => {
	await joiValidator(changePasswordSchema, args);

	const user = res.locals.user as User;

	const isMatched = user.comparePassword(args.oldPassword);
	if (!isMatched) throw new ConflictError('auth.oldPasswordMismatched');

	const password = hashSync(args.password);
	const userDao = new Dao.User();

	const isUpdated = await userDao.update(user.id, { password });
	if (!isUpdated) throw new ConflictError('auth.changePasswordFailed');

	return translate('auth.changePassword');
};
