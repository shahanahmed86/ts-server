import { Model, Schema, Types, model } from 'mongoose';
import { compare } from '../../library/bcrypt.library';
import { ADMIN_TABLE, GENDER_TABLE, ROLE_TABLE, USER_TABLE } from '../constants';
import { BaseDocument } from './base.schema';
import { GenderDocument } from './gender.schema';
import { RoleDocument } from './role.schema';
import { UserDocument } from './user.schema';

export interface AdminDocument extends BaseDocument {
	email: string;
	password: string;
	isSuper: boolean;
	role: Types.ObjectId | RoleDocument;
	deletedBy?: AdminDocument | null;
	deletedAdmins: AdminDocument[];
	deletedRoles: RoleDocument[];
	deletedGenders: GenderDocument[];
	deletedUsers: UserDocument[];
	matchPassword: (password: string) => Promise<boolean>;
}

export type AdminModelType = Model<AdminDocument>;

const adminSchema = new Schema<AdminDocument, AdminModelType>({
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
	role: {
		type: Schema.Types.ObjectId,
		index: true,
		ref: ROLE_TABLE,
		required: true,
	},
	deletedRoles: [{ type: Schema.Types.ObjectId, ref: ROLE_TABLE }],
	deletedGenders: [{ type: Schema.Types.ObjectId, ref: GENDER_TABLE }],
	deletedUsers: [{ type: Schema.Types.ObjectId, ref: USER_TABLE }],
	deletedBy: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: ADMIN_TABLE,
	},
});

adminSchema.methods.matchPassword = function (password: string) {
	return compare(password, this.password);
};

export const Admin = model<AdminDocument>(ADMIN_TABLE, adminSchema);

export default Admin;
