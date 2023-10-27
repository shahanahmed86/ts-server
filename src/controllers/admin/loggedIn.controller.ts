import { AdminArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import { maskPassword } from '../../utils/db.utils';

export const loggedIn: Controller<AdminArgs, object> = async (_, __, { res }) => {
	const admin = res.locals.admin!;
	admin.password &&= maskPassword(admin.password);

	return admin;
};
