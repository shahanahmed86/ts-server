import { ChangePasswordArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { hashSync } from '../../library/bcrypt.library';
import { translate } from '../../library/i18n.library';
import { Admin } from '../../typeorm/entities/admin.entity';
import { ConflictError } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { changePasswordSchema } from '../../validation';

export const changePassword: Controller<string, ChangePasswordArgs> = async (_, args, { res }) => {
	await joiValidator(changePasswordSchema, args);

	const admin = res.locals.user as Admin;

	const isMatched = admin.comparePassword(args.oldPassword);
	if (!isMatched) throw new ConflictError('auth.oldPasswordMismatched');

	const password = hashSync(args.password);
	const adminDao = new Dao.Admin();

	const isUpdated = await adminDao.update(admin.id, { password });
	if (!isUpdated) throw new ConflictError('auth.changePasswordFailed');

	return translate('auth.changePassword');
};
