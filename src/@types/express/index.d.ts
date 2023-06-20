import { Admin } from '../../typeorm/entities/admin.entity';
import { User } from '../../typeorm/entities/user.entity';
import { HttpError } from '../../utils/errors.util';

declare global {
	namespace Express {
		interface Locals {
			user?: Admin | User | null;
			error?: HttpError | null;
		}
	}
}
