import { DeepPartial } from 'typeorm';
import { Genders } from '../typeorm/entities/genders.entity';
import { Users } from '../typeorm/entities/users.entity';
import { Result } from './wrapper.type';

export type FormatResponse = <T>(status: number, message: string, data: T) => Result<T>;

export type AuthPayload = {
	token: string;
	user: Users;
};

export type ImageParams = {
	filename: string;
};

export type UserArgs = DeepPartial<Users>;

export type GenderArgs = DeepPartial<Genders>;

export type LoginArgs = {
	email: string;
	password: string;
};

export type ChangePasswordArgs = {
	oldPassword: string;
	password: string;
};
