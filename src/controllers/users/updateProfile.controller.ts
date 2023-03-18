import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { translate } from '../../library/i18n.library';
import { Users } from '../../typeorm/entities/users.entity';
import { ConflictError } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { profileSchema } from '../../validation';

export const updateProfile: Controller<string, UserArgs> = async (_, args, { res }) => {
	await joiValidator(profileSchema, args);

	const isValid = Object.keys(args).some((key) => args[key as keyof UserArgs]);
	if (!isValid) throw new ConflictError('common.emptyArgument');

	const user = res.locals.user as Users;

	const isUpdated = await Dao.users.update(user.id, args);
	if (!isUpdated) throw new ConflictError('auth.updateProfileFailed');

	return translate('auth.updateProfile');
};
