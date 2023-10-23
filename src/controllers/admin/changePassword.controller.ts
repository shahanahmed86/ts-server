import { ChangePasswordArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { compareSync, hashSync } from '../../library/bcrypt.library';
import { AdminSchema } from '../../database/schemas/admin.schema';
import { ConflictError } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { ChangePassword } from '../../validations';

export const changePassword: Controller<string, ChangePasswordArgs> = async (_, _args, { res }) => {
	const args = await validateRequest(ChangePassword, _args);

	const admin = res.locals.user as AdminSchema;

	const isMatched = compareSync(args.oldPassword, admin.password);
	if (!isMatched) throw new ConflictError('auth.oldPasswordMismatched');

	const password = hashSync(args.password);
	const adminDao = new Dao.Admin();

	const isUpdated = await adminDao.update(admin.id.toString(), { password });
	if (!isUpdated) throw new ConflictError('auth.changePasswordFailed');

	return 'auth.changePassword';
};
