import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import { maskPassword } from '../../utils/db.utils';

export const loggedIn: Controller<UserArgs, object> = async (_, __, { res }) => {
	const user = res.locals.user!;
	user.password &&= maskPassword(user.password);

	return user;
};
