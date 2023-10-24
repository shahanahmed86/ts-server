import { UserArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import { UserDocument } from '../../database/schemas/user.schema';

export const loggedIn: Controller<UserArgs, object> = async (_, __, { res }) => {
	return res.locals.user as UserDocument;
};
