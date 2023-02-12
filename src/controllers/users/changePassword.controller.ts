import { ChangePasswordArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { hashSync } from '../../library/bcrypt.library';
import { Users } from '../../typeorm/entities/users.entity';
import { ConflictError } from '../../utils/errors.util';
import { formatResponse, joiValidator } from '../../utils/logics.util';
import { changePasswordSchema } from '../../validation';

export const changePassword: Controller<null, ChangePasswordArgs> = async (_, args, { res }) => {
	await joiValidator(changePasswordSchema, args);

	const user = res.locals.user as Users;

	const isMatched = user.comparePassword(args.oldPassword);
	if (!isMatched) throw new ConflictError('Old password mismatched');

	const password = hashSync(args.password);
	const isUpdated = await Dao.users.update(user.id, { password });
	if (!isUpdated) throw new ConflictError('Unable to update the password');

	return formatResponse(201, "You've successfully updated the password", null);
};
