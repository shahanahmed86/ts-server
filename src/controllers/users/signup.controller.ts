import { DeepPartial } from 'typeorm';
import { AuthPayload } from '../../@types/api.types';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { Users } from '../../typeorm/entities/users.entity';
import { ConflictError, NotFound } from '../../utils/errors.util';
import { formatResponse, joiValidator } from '../../utils/logics.util';
import { signupSchema } from '../../validation';

type Args = DeepPartial<Users>;

export const signup: Controller<AuthPayload> = async (_, args: Args) => {
	await joiValidator<Args>(signupSchema, args);

	const user = await Dao.users.findOne({ where: { email: args.email! } });
	if (user) throw new ConflictError('User already exists with this email address');

	const role = await Dao.roles.findOne({ where: { name: 'user' } });
	if (!role) throw new NotFound('Role not found');

	args.roleId = role.id;
	const data = await Dao.users.signup(args);

	return formatResponse<AuthPayload>(201, "You've successfully signed up", data);
};
