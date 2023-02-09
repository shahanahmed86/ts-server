import { DeepPartial } from 'typeorm';
import { AuthPayload } from '../../@types/api.types';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { User } from '../../typeorm/entities/user.entity';
import { ConflictError, NotFound } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { signupSchema } from '../../validation';

const signup: Controller<DeepPartial<User>, AuthPayload> = async (_, args) => {
	await joiValidator<DeepPartial<User>>(signupSchema, args);

	const user = await Dao.users.findOne({ where: { email: args.email } });
	if (user) throw new ConflictError('User already exists with this email address');

	const role = await Dao.roles.findOne({ where: { name: 'user' } });
	if (!role) throw new NotFound('Role not found');

	args.roleId = role.id;
	return Dao.users.save(args);
};

export default signup;
