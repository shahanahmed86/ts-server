import { Controller } from '../../@types/wrapper.type';
import * as Dao from '../../dao';
import { Head } from '../../typeorm/entities/head.entity';
import { joiValidator } from '../../utils/logics.util';
import { addHeadSchema } from '../../validation';

export const addHead: Controller<Head, Head> = async (_, args, { res }) => {
	await joiValidator(addHeadSchema, args);

	const params = { ...args, userId: res.locals.user!.id };
	return Dao.head.save(params);
};
