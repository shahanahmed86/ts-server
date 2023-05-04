import { FindManyOptions } from 'typeorm';
import { HeadArgs, HeadParams, Paginated } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { Head } from '../../typeorm/entities/head.entity';

export const getHeads: Controller<Paginated<HeadArgs>, HeadParams> = async (_, args) => {
	const params: FindManyOptions<Head> = { skip: args.offset as number, take: args.limit as number };
	return Dao.head.findManyAndCount(params);
};
