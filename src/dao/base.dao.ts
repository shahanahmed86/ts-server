import { FindManyOptions, FindOneOptions, ObjectLiteral, Repository } from 'typeorm';
import { LIMIT, OFFSET } from '../utils/constants.util';

class BaseDao<T extends ObjectLiteral> {
	model: Repository<T>;
	modelName: string;

	constructor(model: Repository<T>, modelName: string) {
		this.model = model;
		this.modelName = modelName;
	}

	findOne(options: FindOneOptions<T>): Promise<T | null> {
		options.where = Object.assign({}, options.where, { deletedAt: null });
		return this.model.findOne(options);
	}

	findMany(options: FindManyOptions<T>): Promise<T[]> {
		const { where, skip = OFFSET * (options.take ?? LIMIT), take = LIMIT } = options;

		options.where = Object.assign({}, where, { deletedAt: null });
		options.skip = skip * take;
		options.take = take;

		return this.model.find(options);
	}
}

export default BaseDao;
