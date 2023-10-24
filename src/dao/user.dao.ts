import configs from '../config';
import file from '../library/file.library';
import { USER_TABLE } from '../database/constants';
import { User, UserDocument } from '../database/schemas/user.schema';
import BaseDao from './base.dao';

const { inTest } = configs.app;

class UserDao extends BaseDao<UserDocument> {
	constructor() {
		super(User, USER_TABLE);
	}

	async signup(payload: UserDocument): Promise<UserDocument> {
		const { avatar } = payload;

		if (avatar) payload.avatar = await file.moveImageFromTmp(avatar);

		if (inTest) payload.emailVerified = true;

		const savedUser = await this.save(payload);
		const user = await this.findOne({ id: savedUser.id }, { populate: ['role', 'gender'] });

		return user!;
	}
}

export default UserDao;
