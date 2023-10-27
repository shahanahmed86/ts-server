import mongoose from 'mongoose';
import { common } from './common.constant';

export const GENDER_TABLE = 'gender';
export const GENDER_TABLE_INDEXED_COLUMNS = ['name'];

const commonData = common();

export const GENDER_DATA = [
	{ ...commonData, _id: new mongoose.mongo.ObjectId('6537b3e9d964549cf9dda262'), name: 'Male' },
	{ ...commonData, _id: new mongoose.mongo.ObjectId('6537b49be698652591968b58'), name: 'Female' },
	{
		...commonData,
		_id: new mongoose.mongo.ObjectId('6537b4a305c9c80435922c5f'),
		name: 'Prefer not to say',
	},
];
