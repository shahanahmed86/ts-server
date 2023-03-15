import { GenderArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';

export const getGenders: Controller<GenderArgs[], object> = async () => {
	return Dao.genders.findMany({ skip: 0, take: 1000 });
};
