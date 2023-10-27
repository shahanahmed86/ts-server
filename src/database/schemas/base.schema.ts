import { Document, Types } from 'mongoose';

export interface BaseDocument extends Document {
	_id: Types.ObjectId;
	createdAt: Date | string;
	updatedAt: Date | string;
	deletedAt?: Date | string | null;
}

export interface ExtendedBaseDocument extends BaseDocument {
	deletedBy: null;
}

export default BaseDocument;
