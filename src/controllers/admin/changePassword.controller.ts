import { ChangePasswordArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { hashSync } from '../../library/bcrypt.library';
import { ConflictError } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { ChangePassword } from '../../validations';

export const changePassword: Controller<string, ChangePasswordArgs> = async (_, _args, { res }) => {
	const args = await validateRequest(ChangePassword, _args);

	const admin = res.locals.admin!;

	const isMatched = admin.matchPassword(args.oldPassword);
	if (!isMatched) throw new ConflictError('auth.oldPasswordMismatched');

	const password = hashSync(args.password);
	const adminDao = new Dao.Admin();

	const isUpdated = await adminDao.update({ _id: admin._id }, { password });
	if (!isUpdated) throw new ConflictError('auth.changePasswordFailed');

	return 'auth.changePassword';
};
