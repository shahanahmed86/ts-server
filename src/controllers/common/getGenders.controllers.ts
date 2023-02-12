import { GenderArgs } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { formatResponse } from '../../utils/logics.util';

export const getGenders: Controller<GenderArgs[], object> = async () => {
	const genders = await Dao.genders.findMany({ skip: 0, take: 1000 });

	return formatResponse(200, "You've successfully fetched genders", genders);
};
