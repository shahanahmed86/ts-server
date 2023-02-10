import { DeepPartial } from 'typeorm';
import { hashSync } from '../library/bcrypt.library';
import file from '../library/file.library';
import { encodePayload } from '../library/jwt.library';
import * as redis from '../library/redis.library';
import AppDataSource from '../typeorm';
import { USER_TABLE } from '../typeorm/constants';
import { Users } from '../typeorm/entities/users.entity';
import BaseDao from './base.dao';

const TOKEN_KEY = 'userId';

class UsersDao extends BaseDao<Users> {
	async signup(payload: DeepPartial<Users>): Promise<{ token: string; user: Users }> {
		if (payload.avatar) payload.avatar = await file.moveImageFromTmp(payload.avatar);
		payload.password = hashSync(payload.password!);

		const user = await this.model.save(payload);

		const token = encodePayload(TOKEN_KEY, user.id);
		await redis.AddToken(user.id, token);

		return { token, user };
	}
}

const repository = AppDataSource.getRepository(Users);
export const users = new UsersDao(repository, USER_TABLE);
