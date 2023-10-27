import { RoleDocument } from '../database/schemas';
import { AdminDocument } from '../database/schemas/admin.schema';
import { GenderDocument } from '../database/schemas/gender.schema';
import { UserDocument } from '../database/schemas/user.schema';
import { Result } from './wrapper.type';

export type FormatResponse = <T extends object>(
	status: number,
	message: string,
	data: T,
) => Result<T>;

export type AuthPayload = Partial<UserDocument | AdminDocument>;

export type ImageParams = {
	filename: string;
};

export type UserArgs = Partial<UserDocument>;

export type AdminArgs = Partial<AdminDocument>;

export type GenderArgs = Partial<GenderDocument>;

export type RoleArgs = Partial<RoleDocument>;

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
