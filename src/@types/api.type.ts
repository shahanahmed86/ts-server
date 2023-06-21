import { DeepPartial } from 'typeorm';
import { Admin } from '../typeorm/entities/admin.entity';
import { Gender } from '../typeorm/entities/gender.entity';
import { User } from '../typeorm/entities/user.entity';
import { Result } from './wrapper.type';
import { Head } from '../typeorm/entities/head.entity';

export type FormatResponse = <T>(status: number, message: string, data: T) => Result<T>;

export type AuthPayload = {
	token: string;
	user: User | Admin;
};

export type ImageParams = {
	filename: string;
};

export type UserArgs = DeepPartial<User>;

export type AdminArgs = DeepPartial<Admin>;

export type GenderArgs = DeepPartial<Gender>;

export type HeadArgs = DeepPartial<Head>;

export type HeadParams = {
	offset?: string;
	limit?: string;
	search?: string;
} & DeepPartial<Head>;

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
