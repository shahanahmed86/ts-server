import mongoose from 'mongoose';
import * as Dao from '../src/dao';
import { deleteImage } from './images/images.helper';
import { UserArgs } from '../src/@types/api.type';

export const USER_PROFILE: UserArgs = {
	firstName: 'Shahan Ahmed',
	lastName: 'Khan',
	phone: '+923362122588',
	gender: new mongoose.mongo.ObjectId('6537b3e9d964549cf9dda262'),
};

export const UPDATE_USER_PROFILE: UserArgs = {
	firstName: 'Shahan Ahmed updated',
	lastName: 'Khan updated',
	phone: '+923131126908',
	gender: new mongoose.mongo.ObjectId('6537b4a305c9c80435922c5f'),
};

export const SIGNUP_DATA: UserArgs = {
	...USER_PROFILE,
	email: 'shahan.khaan@gmail.com',
	password: '123Abc456',
};

export async function deleteUsers() {
	const userDao = new Dao.User();

	const users = await userDao.findMany({ email: SIGNUP_DATA.email }, undefined, 'id avatar');

	for (const user of users) {
		if (user.avatar) await deleteImage(user.avatar);
		await userDao.hardDelete({ _id: new mongoose.mongo.ObjectId(user.id) });
	}
}

export function getCookieValue(header: Record<string, string>): string {
	return header['set-cookie'][0];
}
