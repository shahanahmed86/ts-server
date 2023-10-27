import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { translate } from '../../library/i18n.library';
import { ConflictError } from '../../utils/errors.util';
import { validateRequest } from '../../utils/logics.util';
import { UpdateProfile } from '../../validations';

export const updateProfile: Controller<string, UserArgs> = async (_, _args, { res }) => {
	const args = await validateRequest(UpdateProfile, _args);

	const isValid = Object.keys(args).some((key) => args[key as keyof UserArgs]);
	if (!isValid) throw new ConflictError('common.emptyArgument');

	const user = res.locals.user!;

	const userDao = new Dao.User();

	const hasPhoneChanged = (args.phone && user.phone !== args.phone && user.phoneVerified) ?? false;
	if (hasPhoneChanged) args.phoneVerified = false;

	const isUpdated = await userDao.update({ _id: user._id }, args);
	if (!isUpdated) throw new ConflictError('auth.updateProfileFailed');

	return translate('auth.updateProfile');
};
