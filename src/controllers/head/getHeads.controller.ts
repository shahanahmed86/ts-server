import { HeadArgs, Paginated } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';

export const getHeads: Controller<Paginated<HeadArgs>, object> = async (_, args) => {
	return Dao.head.findManyAndCount(args);
};
