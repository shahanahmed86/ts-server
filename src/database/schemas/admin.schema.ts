import { Schema, model } from 'mongoose';
import { ADMIN_TABLE, GENDER_TABLE, ROLE_TABLE, USER_TABLE } from '../constants';
import { BaseSchema } from './base.schema';
import { GenderSchema } from './gender.schema';
import { RoleSchema } from './role.schema';
import { UserSchema } from './user.schema';

export interface AdminSchema extends BaseSchema {
	email: string;
	password: string;
	isSuper: boolean;
	role: RoleSchema;
	deletedBy?: AdminSchema | null;
	deletedAdmins: AdminSchema[];
	deletedRoles: RoleSchema[];
	deletedGenders: GenderSchema[];
	deletedUsers: UserSchema[];
}

const adminSchema = new Schema<AdminSchema>({
	id: {
		type: Schema.Types.ObjectId,
		index: true,
		required: true,
	},
	email: {
		type: String,
		index: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	isSuper: {
		type: Boolean,
		required: false,
		default: false,
	},
	role: {
		type: Schema.Types.ObjectId,
		index: true,
		ref: ROLE_TABLE,
		required: true,
	},
	deletedRoles: [
		{
			type: Schema.Types.ObjectId,
			ref: ROLE_TABLE,
		},
	],
	deletedGenders: [
		{
			type: Schema.Types.ObjectId,
			ref: GENDER_TABLE,
		},
	],
	deletedUsers: [
		{
			type: Schema.Types.ObjectId,
			ref: USER_TABLE,
		},
	],
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

export const AdminModel = model<AdminSchema>(ADMIN_TABLE, adminSchema);

export default AdminModel;
