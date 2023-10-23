import { AdminSchema } from '../database/schemas/admin.schema';
import { GenderSchema } from '../database/schemas/gender.schema';
import { UserSchema } from '../database/schemas/user.schema';
import { Result } from './wrapper.type';

export type FormatResponse = <T extends object>(
	status: number,
	message: string,
	data: T,
) => Result<T>;

export type AuthPayload = UserSchema | AdminSchema;

export type ImageParams = {
	filename: string;
};

export type UserArgs = Partial<UserSchema>;

export type AdminArgs = Partial<AdminSchema>;

export type GenderArgs = Partial<GenderSchema>;

export type Paginated<T> = {
	count: number;
	rows: T[];
	pages: number;
	page: number;
};

export type LoginArgs = {
	email: string;
	password: string;
};

export type ChangePasswordArgs = {
	oldPassword: string;
	password: string;
};
