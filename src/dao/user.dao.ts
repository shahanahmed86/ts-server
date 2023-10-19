import { UserArgs } from '../@types/api.type';
import configs from '../config';
import { hashSync } from '../library/bcrypt.library';
import file from '../library/file.library';
import { USER_TABLE } from '../typeorm/constants';
import { User } from '../typeorm/entities/user.entity';
import BaseDao from './base.dao';

const { inTest } = configs.app;

class UserDao extends BaseDao<User> {
	constructor() {
		super(User, USER_TABLE);
	}

	async signup(payload: UserArgs): Promise<User> {
		const { password, avatar } = payload;

		payload.password = hashSync(password!);
		if (avatar) payload.avatar = await file.moveImageFromTmp(avatar);

		if (inTest) payload.emailVerified = true;

		const saved = await this.model.save(payload);
		const user = await this.findOne({
			where: { id: saved.id },
			relations: { role: true, gender: true },
		});

		return user!;
	}
}

export default UserDao;
