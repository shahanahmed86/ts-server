import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import { User } from '../../typeorm/entities/user.entity';

export const loggedIn: Controller<UserArgs, object> = async (_, __, { res }) => {
	return res.locals.user as User;
};
