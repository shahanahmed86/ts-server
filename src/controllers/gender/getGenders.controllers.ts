import { GenderArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';

export const getGenders: Controller<GenderArgs[], object> = async () => {
	const genderDao = new Dao.Gender();
	return genderDao.findMany({}, { skip: 0, limit: Infinity });
};
