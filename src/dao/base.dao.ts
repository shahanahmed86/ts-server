import { FilterQuery, Model, QueryOptions, Types } from 'mongoose';
import { Paginated } from '../@types/api.type';
import { BaseDocument } from '../database/schemas/base.schema';
import { COMMON_OMIT_FIELDS, LIMIT, OFFSET } from '../utils/constants.util';
import { getISODate } from '../utils/logics.util';
import { getDeleteParams } from '../utils/db.utils';
class BaseDao<Document extends BaseDocument> {
	model: Model<Document>;
	modelName: string;

	constructor(target: Model<Document>, modelName: string) {
		this.model = target;
		this.modelName = modelName;
	}

	async exists(filter: FilterQuery<Document>): Promise<boolean> {
		const isExists = await this.model.exists(filter).exec();
		return !!isExists;
	}

	findOne(
		filter: FilterQuery<Document>,
		options: QueryOptions<Document> = {},
		attributes = COMMON_OMIT_FIELDS,
	): Promise<Document | null> {
		const preFields = getDeleteParams();
		Object.assign(filter, preFields);

		return this.model.findOne(filter, undefined, options).select(attributes).exec();
	}

	async findManyAndCount(
		filter: FilterQuery<Document> = {},
		options: QueryOptions<Document> = {},
		attributes = COMMON_OMIT_FIELDS,
		sort = '-createdAt',
	): Promise<Paginated<Document>> {
		options.limit ??= +LIMIT;
		options.skip ??= +OFFSET;

		const { skip, limit } = options;
		Object.assign(options, { skip: (skip - 1) * limit, limit });

		const preFields = getDeleteParams();
		Object.assign(filter, preFields);

		const rows = await this.model.find(filter, options).select(attributes).sort(sort).exec();
		const count = await this.model.countDocuments(filter, options).sort(sort).exec();

		return { count, pages: Math.ceil(count / skip), page: +skip, rows };
	}

	findMany(
		filter: FilterQuery<Document> = {},
		options: QueryOptions<Document> = {},
		attributes = COMMON_OMIT_FIELDS,
		sort = '-createdAt',
	): Promise<Document[]> {
		const preFields = getDeleteParams();
		Object.assign(filter, preFields);

		return this.model.find(filter, options).select(attributes).sort(sort).exec();
	}

	async save(data: Partial<Document>): Promise<Document> {
		data.createdAt = getISODate();
		data.updatedAt = getISODate();

		return this.model.create(data);
	}

	async update(
		filter: FilterQuery<Document>,
		data: Partial<Document>,
		options: QueryOptions<Document> = {},
	): Promise<boolean> {
		data.updatedAt = getISODate();

		const result = await this.model.updateOne(filter, { $set: data }, options).exec();
		return !!result.modifiedCount;
	}

	async delete(
		filter: FilterQuery<Document>,
		options: QueryOptions<Document> = {},
		userId: Types.ObjectId,
	): Promise<boolean> {
		const data = { deletedAt: getISODate(), deletedBy: userId };

		const result = await this.model.updateOne(filter, { $set: data }, options).exec();
		return !!result.modifiedCount;
	}

	async hardDelete(filter: FilterQuery<Document>): Promise<boolean> {
		const result = await this.model.deleteOne(filter).exec();
		return !!result.deletedCount;
	}
}

export default BaseDao;
