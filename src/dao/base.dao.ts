import {
	DeepPartial,
	FindManyOptions,
	FindOneOptions,
	FindOptionsWhere,
	IsNull,
	ObjectLiteral,
	Repository,
} from 'typeorm';
import { Base } from '../typeorm/entities/base.entity';
import { CHUNK_SIZE, LIMIT, OFFSET } from '../utils/constants.util';
import { getISODate } from '../utils/logics.util';
import { Paginated } from '../@types/api.type';

type BaseArgs = DeepPartial<Base>;

class BaseDao<BaseEntity extends ObjectLiteral> {
	model: Repository<BaseEntity>;
	modelName: string;

	constructor(model: Repository<BaseEntity>, modelName: string) {
		this.model = model;
		this.modelName = modelName;
	}

	get deleteParams() {
		return { deletedAt: IsNull(), deletedById: IsNull() };
	}

	findOne(options: FindOneOptions<BaseEntity>): Promise<BaseEntity | null> {
		const { where } = options;
		options.where = Object.assign({}, where, this.deleteParams);

		return this.model.findOne(options);
	}

	async findManyAndCount(options: FindManyOptions<BaseEntity>): Promise<Paginated<BaseEntity>> {
		const {
			where,
			skip = OFFSET * (options.take ?? LIMIT),
			take = LIMIT,
			order = { createdAt: 'DESC' },
		} = options;

		options.where = Object.assign({}, where, this.deleteParams);
		Object.assign(options, { skip: (skip - 1) * take, take, order });

		const [rows, count] = await this.model.findAndCount(options);
		return { count, pages: Math.ceil(count / take), page: +skip, rows };
	}

	findMany(options: FindManyOptions<BaseEntity>): Promise<BaseEntity[]> {
		const {
			where,
			skip = OFFSET * (options.take ?? LIMIT),
			take = LIMIT,
			order = { createdAt: 'DESC' },
		} = options;

		options.where = Object.assign({}, where, this.deleteParams);
		Object.assign(options, { skip: skip * take, take, order });

		return this.model.find(options);
	}

	async save<T extends BaseEntity>(data: T): Promise<T> {
		return this.model.save<T>(data, { chunk: CHUNK_SIZE });
	}

	async update<T>(criteria: FindOptionsWhere<string>, data: T): Promise<boolean> {
		const postData: BaseArgs = { updatedAt: getISODate() };
		const payload = Object.assign<ObjectLiteral, T, BaseArgs>({}, data, postData);

		const result = await this.model.update(criteria, payload);
		return !!result.affected;
	}

	async delete(criteria: FindOptionsWhere<string>, userId: string): Promise<boolean> {
		const postData: BaseArgs = { deletedAt: getISODate(), deletedById: userId };
		const payload = Object.assign<ObjectLiteral, BaseArgs>({}, postData);

		const result = await this.model.update(criteria, payload);
		return !!result.affected;
	}

	async hardDelete(criteria: FindOptionsWhere<string>): Promise<boolean> {
		const result = await this.model.delete(criteria);
		return !!result.affected;
	}
}

export default BaseDao;
