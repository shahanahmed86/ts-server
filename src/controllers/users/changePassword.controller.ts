import { ChangePasswordArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { hashSync } from '../../library/bcrypt.library';
import { translate } from '../../library/i18n.library';
import { Users } from '../../typeorm/entities/users.entity';
import { ConflictError } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { changePasswordSchema } from '../../validation';

export const changePassword: Controller<string, ChangePasswordArgs> = async (_, args, { res }) => {
	await joiValidator(changePasswordSchema, args);

	const user = res.locals.user as Users;

	const isMatched = user.comparePassword(args.oldPassword);
	if (!isMatched) throw new ConflictError('auth.oldPasswordMismatched');

	const password = hashSync(args.password);
	const isUpdated = await Dao.users.update(user.id, { password });
	if (!isUpdated) throw new ConflictError('auth.changePasswordFailed');

	return translate('auth.changePassword');
};
