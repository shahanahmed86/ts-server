import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { translate } from '../../library/i18n.library';
import { User } from '../../typeorm/entities/user.entity';
import { ConflictError } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { profileSchema } from '../../validation';

export const updateProfile: Controller<string, UserArgs> = async (_, args, { res }) => {
	await joiValidator(profileSchema, args);

	const isValid = Object.keys(args).some((key) => args[key as keyof UserArgs]);
	if (!isValid) throw new ConflictError('common.emptyArgument');

	const user = res.locals.user as User;

	const isUpdated = await Dao.user.update(user.id, args);
	if (!isUpdated) throw new ConflictError('auth.updateProfileFailed');

	return translate('auth.updateProfile');
};
