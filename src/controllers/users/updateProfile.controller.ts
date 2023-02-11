import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { Users } from '../../typeorm/entities/users.entity';
import { ConflictError } from '../../utils/errors.util';
import { formatResponse, joiValidator } from '../../utils/logics.util';
import { profileSchema } from '../../validation';

export const updateProfile: Controller<null> = async (_, args: UserArgs, { res }) => {
	await joiValidator(profileSchema, args);

	const isValid = Object.keys(args).some((key) => args[key as keyof UserArgs]);
	if (!isValid) throw new ConflictError('At least one argument to pass to update');

	const user = res.locals.user as Users;

	const isUpdated = await Dao.users.update<UserArgs>(user.id, args);
	if (!isUpdated) throw new ConflictError('Unable to update your account');

	return formatResponse(201, "You've successfully updated your accounts", null);
};
