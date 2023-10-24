import { Model, Schema, model } from 'mongoose';
import { ADMIN_TABLE, ROLE_TABLE } from '../constants';
import { AdminDocument } from './admin.schema';
import { BaseDocument } from './base.schema';
import { UserDocument } from './user.schema';

export interface RoleDocument extends BaseDocument {
	name: string;
	deletedBy?: AdminDocument | null;
	users: UserDocument[];
}

export type RoleModelType = Model<RoleDocument>;

const roleSchema = new Schema<RoleDocument, RoleModelType>({
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

export const Role = model<RoleDocument>(ROLE_TABLE, roleSchema);

export default Role;
