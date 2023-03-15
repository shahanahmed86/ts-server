import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { Users } from '../../typeorm/entities/users.entity';
import { ConflictError } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { profileSchema } from '../../validation';

export const updateProfile: Controller<null, UserArgs> = async (_, args, { res }) => {
	await joiValidator(profileSchema, args);

	const isValid = Object.keys(args).some((key) => args[key as keyof UserArgs]);
	if (!isValid) throw new ConflictError('At least one argument to pass to update');

	const user = res.locals.user as Users;

	const isUpdated = await Dao.users.update(user.id, args);
	if (!isUpdated) throw new ConflictError('Unable to update your account');

	return null;
};
