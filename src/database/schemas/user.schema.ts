import { Model, Schema, Types, model } from 'mongoose';
import { compareSync } from '../../library/bcrypt.library';
import { ADMIN_TABLE, GENDER_TABLE, ROLE_TABLE, USER_TABLE } from '../constants';
import { AdminDocument } from './admin.schema';
import { BaseDocument } from './base.schema';
import { GenderDocument } from './gender.schema';
import { RoleDocument } from './role.schema';

export interface UserDocument extends BaseDocument {
	firstName?: string | null;
	lastName?: string | null;
	avatar?: string | null;
	email: string;
	emailVerified: boolean;
	password: string;
	phone?: string;
	phoneVerified: boolean;
	role: Types.ObjectId | RoleDocument;
	gender: Types.ObjectId | GenderDocument;
	deletedBy?: (Types.ObjectId | AdminDocument) | null;
	matchPassword: (password: string) => Promise<boolean>;
}

export type UserModelType = Model<UserDocument>;

const userSchema = new Schema<UserDocument, UserModelType>({
	firstName: {
		type: String,
		required: false,
		default: null,
	},
	lastName: {
		type: String,
		required: false,
		default: null,
	},
	avatar: {
		type: String,
		required: false,
		default: null,
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
	deletedBy: {
		type: Schema.Types.ObjectId,
		required: false,
		ref: ADMIN_TABLE,
		default: null,
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
});

userSchema.methods.matchPassword = function (password: string) {
	return compareSync(password, this.password);
};

export const User = model<UserDocument>(USER_TABLE, userSchema);

export default User;
