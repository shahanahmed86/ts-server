import { Schema, model } from 'mongoose';
import { ADMIN_TABLE, ROLE_TABLE } from '../constants';
import { AdminSchema } from './admin.schema';
import { BaseSchema } from './base.schema';
import { UserSchema } from './user.schema';

export interface RoleSchema extends BaseSchema {
	name: string;
	deletedBy?: AdminSchema | null;
	users: UserSchema[];
}

const roleSchema = new Schema<RoleSchema>({
	id: {
		type: Schema.Types.ObjectId,
		index: true,
		required: true,
	},
	name: {
		type: String,
		index: true,
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

export const RoleModel = model<RoleSchema>(ROLE_TABLE, roleSchema);

export default RoleModel;
