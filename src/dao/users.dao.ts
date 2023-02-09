import { DeepPartial, FindOneOptions, Repository } from 'typeorm';
import AppDataSource from '../typeorm';
import { User } from '../typeorm/entities/user.entity';
import BaseDao from './base.dao';
import * as redis from '../library/redis.library';
import { encodePayload } from '../library/jwt.library';

const TOKEN_KEY = 'userId';

class UserDao extends BaseDao {
	model: Repository<User>;
	modelName: string;

	constructor(model: Repository<User>, modelName: string) {
		super();
		this.model = model;
		this.modelName = modelName;
	}

	findOne(findOption: FindOneOptions<User>): Promise<User | null> {
		this.preWhere(findOption);
		return this.model.findOne(findOption);
	}

	async save(payload: DeepPartial<User>): Promise<{ token: string; user: User }> {
		const user = await this.model.save(payload);

		const token = encodePayload(TOKEN_KEY, user.password);
		await redis.AddToken(TOKEN_KEY, token);

		return {
			token,
			user,
		};
	}
}

const users = new UserDao(AppDataSource.getRepository(User), 'users');

export default users;
