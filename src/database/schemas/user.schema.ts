import { Schema, model } from 'mongoose';
import { ADMIN_TABLE, GENDER_TABLE, ROLE_TABLE, USER_TABLE } from '../constants';
import { AdminSchema } from './admin.schema';
import { BaseSchema } from './base.schema';
import { GenderSchema } from './gender.schema';
import { RoleSchema } from './role.schema';

export interface UserSchema extends BaseSchema {
	firstName?: string | null;
	lastName?: string | null;
	avatar?: string | null;
	email: string;
	emailVerified: boolean;
	password: string;
	phone?: string;
	phoneVerified: boolean;
	role: RoleSchema;
	gender: GenderSchema;
	deletedBy?: AdminSchema | null;
}

const userSchema = new Schema<UserSchema>({
	id: {
		type: Schema.Types.ObjectId,
		index: true,
		required: true,
	},
	firstName: {
		type: String,
		required: false,
	},
	lastName: {
		type: String,
		required: false,
	},
	avatar: {
		type: String,
		required: false,
	},
	email: {
		type: String,
		index: true,
		required: true,
	},
	emailVerified: {
		type: Boolean,
		required: false,
		default: false,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		index: true,
		required: true,
	},
	phoneVerified: {
		type: Boolean,
		required: false,
		default: false,
	},
	role: {
		type: Schema.Types.ObjectId,
		ref: ROLE_TABLE,
		required: true,
		index: true,
	},
	gender: {
		type: Schema.Types.ObjectId,
		ref: GENDER_TABLE,
		required: true,
	},
	createdAt: {
		type: Date,
		required: true,
	},
	updatedAt: {
		type: Date,
		required: true,
	},
	deletedAt: {
		type: Date,
		required: false,
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: ADMIN_TABLE,
	},
});

export const UserModel = model<UserSchema>(USER_TABLE, userSchema);

export default UserModel;
