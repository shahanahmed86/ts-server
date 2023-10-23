import { ADMIN_TABLE, GENDER_TABLE } from '../constants';
import { AdminSchema } from './admin.schema';
import { BaseSchema } from './base.schema';
import { UserSchema } from './user.schema';
import { Schema, model } from 'mongoose';

export interface GenderSchema extends BaseSchema {
	name: string;
	deletedBy?: AdminSchema | null;
	users: UserSchema[];
}

const genderSchema = new Schema<GenderSchema>({
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

export const GenderModel = model<GenderSchema>(GENDER_TABLE, genderSchema);

export default GenderModel;
