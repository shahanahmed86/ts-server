import * as Dao from '../src/dao';
import { deleteImage } from './images/images.helper';

export async function deleteUsers() {
	const users = await Dao.user.findMany({
		select: { id: true, avatar: true },
	});

	for (const user of users) {
		if (user.avatar) await deleteImage(user.avatar);
		await Dao.user.hardDelete(user.id);
	}
}
