import { Model, Schema, model } from 'mongoose';
import { ADMIN_TABLE, GENDER_TABLE } from '../constants';
import { AdminDocument } from './admin.schema';
import { BaseDocument } from './base.schema';
import { UserDocument } from './user.schema';

export interface GenderDocument extends BaseDocument {
	name: string;
	deletedBy?: AdminDocument | null;
	users: UserDocument[];
}

export type GenderModelType = Model<GenderDocument>;

const genderSchema = new Schema<GenderDocument, GenderModelType>({
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

export const Gender = model<GenderDocument>(GENDER_TABLE, genderSchema);

export default Gender;
