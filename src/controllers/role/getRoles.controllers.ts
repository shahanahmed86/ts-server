import { RoleArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';

export const getRoles: Controller<RoleArgs[], object> = async () => {
	const roleDao = new Dao.Role();
	return roleDao.findMany(undefined, undefined, undefined, 'name');
};
