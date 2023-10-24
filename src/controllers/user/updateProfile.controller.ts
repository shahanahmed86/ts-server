import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { UserDocument } from '../../database/schemas/user.schema';
import { ConflictError } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { UpdateProfile } from '../../validations';

export const updateProfile: Controller<string, UserArgs> = async (_, _args, { res }) => {
	const args = await validateRequest(UpdateProfile, _args);

	const isValid = Object.keys(args).some((key) => args[key as keyof UserArgs]);
	if (!isValid) throw new ConflictError('common.emptyArgument');

	const user = res.locals.user as UserDocument;

	const userDao = new Dao.User();

	const hasPhoneChanged = (args.phone && user.phone !== args.phone && user.phoneVerified) ?? false;
	if (hasPhoneChanged) args.phoneVerified = false;

	const isUpdated = await userDao.update({ id: user.id }, {}, args);
	if (!isUpdated) throw new ConflictError('auth.updateProfileFailed');

	return 'auth.updateProfile';
};
