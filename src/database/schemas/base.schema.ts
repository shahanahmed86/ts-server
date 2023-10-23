import { Types } from 'mongoose';

export interface BaseSchema {
	id: Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
}

export default BaseSchema;
