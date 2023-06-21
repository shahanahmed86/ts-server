import Joi from 'joi';
import { DeepPartial } from 'typeorm';
import { Head } from '../typeorm/entities/head.entity';
import { Pagination } from '../@types/common.type';

export const addHeadSchema = Joi.object<Head>({
	name: Joi.string().max(50).label('Head title').disallow('').required(),
	parentId: Joi.string().uuid().label('Parent ID'),
	transactable: Joi.boolean().label('Transactable'),
}).required();

export const getHeadsSchema = Joi.object<DeepPartial<Head & Pagination>>({
	parentId: Joi.string().uuid().label('Parent ID').allow(null).disallow(''),
	limit: Joi.string().label('Limit').disallow(null, '', '0'),
	offset: Joi.string().label('Skip').disallow(null, ''),
	search: Joi.string().label('Search').disallow(null, ''),
}).required();
