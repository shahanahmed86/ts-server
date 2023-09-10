import { Controller } from '../../@types/wrapper.type';
import { clearSession } from '../../utils/logics.util';

export const logout: Controller<void, null> = async (_, __, { req, res }) => {
	return clearSession(req, res);
};
