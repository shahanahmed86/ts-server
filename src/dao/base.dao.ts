import { FilterQuery, Model, QueryOptions, Types } from 'mongoose';
import { Paginated } from '../@types/api.type';
import { BaseDocument } from '../database/schemas/base.schema';
import { LIMIT, OFFSET } from '../utils/constants.util';
import { getISODate } from '../utils/logics.util';

class BaseDao<Document extends BaseDocument> {
	model: Model<Document>;
	modelName: string;

	constructor(target: Model<Document>, modelName: string) {
		this.model = target;
		this.modelName = modelName;
	}

	async exists(filter: FilterQuery<Document>): Promise<boolean> {
		const isExists = await this.model.exists(filter);
		return !!isExists;
	}

	deleteParams<T extends BaseDocument>(args: T): BaseDocument {
		return Object.assign(args, { deletedAt: null, deletedBy: null });
	}

	findOne(
		filter: FilterQuery<Document>,
		options: QueryOptions<Document>,
	): Promise<Document | null> {
		return this.model.findOne(filter, undefined, options);
	}

	async findManyAndCount(
		filter: FilterQuery<Document> = {},
		options: QueryOptions<Document> = {},
	): Promise<Paginated<Document>> {
		options.limit ??= +LIMIT;
		options.skip ??= +OFFSET;
		options.sort ??= { createdAt: -1 };

		const { skip, limit, sort } = options;
		Object.assign(options, { skip: (skip - 1) * limit, limit, sort });

		const rows = await this.model.find(filter, options);
		const count = await this.model.countDocuments(filter, options);

		return { count, pages: Math.ceil(count / skip), page: +skip, rows };
	}

	findMany(
		filter: FilterQuery<Document> = {},
		options: QueryOptions<Document> = {},
	): Promise<Document[]> {
		options.sort ??= { createdAt: -1 };
		return this.model.find(filter, options);
	}

	async save(data: Partial<Document>): Promise<Document> {
		data.createdAt = getISODate();
		data.updatedAt = getISODate();

		return this.model.create(data);
	}

	async update(
		filter: FilterQuery<Document>,
		options: QueryOptions<Document> = {},
		data: Partial<Document>,
	): Promise<boolean> {
		data.updatedAt = getISODate();

		const result = await this.model.updateOne(filter, { $set: { data } }, options);
		return !!result.modifiedCount;
	}

	async delete(
		filter: FilterQuery<Document>,
		options: QueryOptions<Document> = {},
		userId: Types.ObjectId,
	): Promise<boolean> {
		const data = {
			deletedAt: getISODate(),
			deletedBy: userId,
		};

		const result = await this.model.updateOne(filter, { $set: { data } }, options);
		return !!result.modifiedCount;
	}

	async hardDelete(filter: FilterQuery<Document>): Promise<boolean> {
		const result = await this.model.deleteOne(filter);
		return !!result.deletedCount;
	}
}

export default BaseDao;
