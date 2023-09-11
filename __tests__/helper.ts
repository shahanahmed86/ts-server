import * as Dao from '../src/dao';
import { deleteImage } from './images/images.helper';

export async function deleteUsers() {
	const userDao = new Dao.User();

	const users = await userDao.findMany({
		select: { id: true, avatar: true },
	});

	for (const user of users) {
		if (user.avatar) await deleteImage(user.avatar);
		await userDao.hardDelete(user.id);
	}
}
