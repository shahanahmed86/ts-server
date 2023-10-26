import { FilterQuery, Model, QueryOptions, Types } from 'mongoose';
import { Paginated } from '../@types/api.type';
import { BaseDocument } from '../database/schemas/base.schema';
import { LIMIT, OFFSET, COMMON_OMIT_FIELDS } from '../utils/constants.util';
import { getISODate } from '../utils/logics.util';

type ExtendedBaseDocument = BaseDocument & { deletedBy: Types.ObjectId | null };
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

	deleteParams(): Partial<ExtendedBaseDocument> {
		return { deletedAt: null, deletedBy: null };
	}

	findOne(
		filter: FilterQuery<Document>,
		options: QueryOptions<Document> = {},
		exclude: string = COMMON_OMIT_FIELDS,
	): Promise<Document | null> {
		const preFields = this.deleteParams();
		Object.assign(filter, preFields);

		return this.model.findOne(filter, undefined, options).select(exclude).exec();
	}

	async findManyAndCount(
		filter: FilterQuery<Document> = {},
		options: QueryOptions<Document> = {},
		exclude: string = COMMON_OMIT_FIELDS,
	): Promise<Paginated<Document>> {
		options.limit ??= +LIMIT;
		options.skip ??= +OFFSET;
		options.sort ??= { createdAt: -1 };

		const { skip, limit, sort } = options;
		Object.assign(options, { skip: (skip - 1) * limit, limit, sort });

		const preFields = this.deleteParams();
		Object.assign(filter, preFields);

		const rows = await this.model.find(filter, options).select(exclude).exec();
		const count = await this.model.countDocuments(filter, options).exec();

		return { count, pages: Math.ceil(count / skip), page: +skip, rows };
	}

	findMany(
		filter: FilterQuery<Document> = {},
		options: QueryOptions<Document> = {},
		exclude: string = COMMON_OMIT_FIELDS,
	): Promise<Document[]> {
		options.sort ??= { createdAt: -1 };
		return this.model.find(filter, options).select(exclude).exec();
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

		const result = await this.model.updateOne(filter, { $set: { data } }, options).exec();
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

		const result = await this.model.updateOne(filter, { $set: { data } }, options).exec();
		return !!result.modifiedCount;
	}

	async hardDelete(filter: FilterQuery<Document>): Promise<boolean> {
		const result = await this.model.deleteOne(filter).exec();
		return !!result.deletedCount;
	}
}

export default BaseDao;
