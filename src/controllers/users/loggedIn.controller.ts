import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import { Users } from '../../typeorm/entities/users.entity';
import { formatResponse } from '../../utils/logics.util';

export const loggedIn: Controller<UserArgs> = async (_, __, { res }) => {
	return formatResponse(200, "You've your login session", res.locals.user as Users);
};
