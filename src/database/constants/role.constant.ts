import mongoose from 'mongoose';
import { common } from './common.constant';

export const ROLE_TABLE = 'role';
export const ROLE_TABLE_INDEXED_COLUMNS = ['name'];

export const ROLE_DATA = [
	{ ...common, _id: new mongoose.mongo.ObjectId('6537c129a33a050118ef9c2d'), name: 'admin' },
	{ ...common, _id: new mongoose.mongo.ObjectId('6537c1337fe9ec98e3e46263'), name: 'user' },
];
