import { AdminArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import { Admin } from '../../typeorm/entities/admin.entity';

export const loggedIn: Controller<AdminArgs, object> = async (_, __, { res }) => {
	return res.locals.user as Admin;
};
