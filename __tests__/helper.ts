import mongoose from 'mongoose';
import * as Dao from '../src/dao';
import { deleteImage } from './images/images.helper';

export async function deleteUsers() {
	const userDao = new Dao.User();

	const users = await userDao.findMany(
		{
			firstName: 'Shahan Ahmed',
			lastName: 'Khan',
			phone: '+923362122588',
			gender: new mongoose.mongo.ObjectId('6537b3e9d964549cf9dda262'),
		},
		undefined,
		'id avatar',
	);

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
