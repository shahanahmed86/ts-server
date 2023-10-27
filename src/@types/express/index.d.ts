import 'express';
import { AdminDocument } from '../../database/schemas/admin.schema';
import { UserDocument } from '../../database/schemas/user.schema';
import { HttpError } from '../../utils/errors.util';
import { Role } from '../common.type';

declare global {
	namespace Express {
		interface Locals {
			admin?: AdminDocument | null;
			user?: UserDocument | null;
			error?: HttpError | null;
			role?: Role;
		}
	}
}
