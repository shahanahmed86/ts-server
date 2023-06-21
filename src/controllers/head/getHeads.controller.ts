import { FindManyOptions, ILike, IsNull } from 'typeorm';
import { HeadArgs, HeadParams, Paginated } from '../../@types/api.type';
import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { Head } from '../../typeorm/entities/head.entity';
import { NotFound } from '../../utils/errors.util';
import { joiValidator } from '../../utils/logics.util';
import { getHeadsSchema } from '../../validation';

export const getHeads: Controller<Paginated<HeadArgs>, HeadParams> = async (_, args, { res }) => {
	console.log(args);
	await joiValidator(getHeadsSchema, args);

	const parent = await Dao.head.findOne({ where: { id: args.parentId } });
	if (!parent) throw new NotFound(['common.notFound', 'Head']);

	const params: FindManyOptions<Head> = {
		where: { userId: res.locals.user!.id },
	};

	if (args.parentId) Object.assign(params.where!, { parentId: args.parentId });
	else if (args.parentId === null) Object.assign(params.where!, { parentId: IsNull() });

	if (args.search) Object.assign(params.where!, { name: ILike(`%${args.search}%`) });

	if (typeof args.offset !== 'undefined') params.skip = +args.offset;
	if (typeof args.limit !== 'undefined') params.take = +args.limit;

	return Dao.head.findManyAndCount(params);
};
