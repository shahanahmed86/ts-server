import * as Dao from '../src/dao';
import { deleteImage } from './images/images.helper';

export async function deleteUsers() {
	const userDao = new Dao.User();

	const users = await userDao.findMany({
		where: {
			firstName: 'Shahan Ahmed',
			lastName: 'Khan',
			phone: '+923362122588',
			genderId: '04521c7b-a128-4f5f-bfb2-96053c0a31b0',
		},
		select: { id: true, avatar: true },
	});

	for (const user of users) {
		if (user.avatar) await deleteImage(user.avatar);
		await userDao.hardDelete(user.id);
	}
}

type Header = {
	[key: string]: string;
};
export function getCookieValue(header: Header): string {
	return header['set-cookie'][0];
}
