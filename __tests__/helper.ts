import * as Dao from '../src/dao';
import { deleteImage } from './images/images.helper';

export async function deleteUsers() {
	const users = await Dao.users.findMany({
		select: { id: true, avatar: true },
		where: { email: 'shahan.khaan@gmail.com' },
	});

	for (const user of users) {
		if (user.avatar) await deleteImage(user.avatar);

		await Dao.users.hardDelete(user.id);
	}
}
