import { AdminArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import { AdminSchema } from '../../database/schemas/admin.schema';

export const loggedIn: Controller<AdminArgs, object> = async (_, __, { res }) => {
	return res.locals.user as AdminSchema;
};
