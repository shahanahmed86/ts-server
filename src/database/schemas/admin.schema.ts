import { Model, Schema, Types, model } from 'mongoose';
import { compareSync } from '../../library/bcrypt.library';
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
	deletedBy?: (Types.ObjectId | AdminDocument) | null;
	deletedAdmins: (Types.ObjectId | AdminDocument)[];
	deletedRoles: (Types.ObjectId | RoleDocument)[];
	deletedGenders: (Types.ObjectId | GenderDocument)[];
	deletedUsers: (Types.ObjectId | UserDocument)[];
	matchPassword: (password: string) => boolean;
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
		required: true,
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
		default: null,
	},
	role: {
		type: Schema.Types.ObjectId,
		index: true,
		ref: ROLE_TABLE,
		required: true,
	},
	deletedBy: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: ADMIN_TABLE,
		default: null,
	},
	deletedRoles: [{ type: Schema.Types.ObjectId, ref: ROLE_TABLE }],
	deletedGenders: [{ type: Schema.Types.ObjectId, ref: GENDER_TABLE }],
	deletedUsers: [{ type: Schema.Types.ObjectId, ref: USER_TABLE }],
});

adminSchema.methods.matchPassword = function (password: string) {
	return compareSync(password, this.password);
};

export const Admin = model<AdminDocument>(ADMIN_TABLE, adminSchema);

export default Admin;
