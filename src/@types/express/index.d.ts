import 'express';
import { AdminSchema } from '../../database/schemas/admin.schema';
import { UserSchema } from '../../database/schemas/user.schema';
import { HttpError } from '../../utils/errors.util';
import { Role } from '../common.type';

declare global {
	namespace Express {
		interface Locals {
			user?: AdminSchema | UserSchema | null;
			error?: HttpError | null;
			role?: Role;
		}
	}
}
