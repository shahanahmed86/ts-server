import { Model, Schema, model } from 'mongoose';
import { compare } from '../../library/bcrypt.library';
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
	role: RoleDocument;
	gender: GenderDocument;
	deletedBy?: AdminDocument | null;
	matchPassword: (password: string) => Promise<boolean>;
}

export type UserModelType = Model<UserDocument>;

const userSchema = new Schema<UserDocument, UserModelType>({
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
	return compare(password, this.password);
};

export const User = model<UserDocument>(USER_TABLE, userSchema);

export default User;
