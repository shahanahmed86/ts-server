import { AuthPayload, UserArgs } from '../@types/api.type';
import { NODE_ENV } from '../config';
import { hashSync } from '../library/bcrypt.library';
import file from '../library/file.library';
import AppDataSource from '../typeorm';
import { USER_TABLE } from '../typeorm/constants';
import { User } from '../typeorm/entities/user.entity';
import BaseDao from './base.dao';

class UsersDao extends BaseDao<User> {
	async signup(payload: UserArgs, role: string): Promise<AuthPayload> {
		const { password, avatar } = payload;

		payload.password = hashSync(password!);
		if (avatar) payload.avatar = await file.moveImageFromTmp(avatar);

		if (NODE_ENV === 'test') payload.emailVerified = true;

		const saved = await this.model.save(payload);
		const user = await this.findOne({
			where: { id: saved.id },
			relations: { role: true, gender: true },
		});

		return user!.postLogin(role);
	}
}

const repository = AppDataSource.getRepository(User);
export const user = new UsersDao(repository, USER_TABLE);
