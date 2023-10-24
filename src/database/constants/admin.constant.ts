import mongoose from 'mongoose';
import { hashSync } from '../../library/bcrypt.library';
import { common } from './common.constant';
import { ROLE_DATA } from './role.constant';

export const ADMIN_TABLE = 'admin';
export const ADMIN_TABLE_INDEXED_COLUMNS = ['email', 'roleId'];

export const ADMIN_DATA = {
	...common,
	_id: new mongoose.mongo.ObjectId('6537d6c81f686eb564ff8b9b'),
	email: 'admin@accounts.com.pk',
	password: hashSync('123Abc456'),
	isSuper: true,
	role: ROLE_DATA[0]!._id,
};
