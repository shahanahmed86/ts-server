import { ObjectSchema } from 'joi';
import { Role } from './common.type';

export type SessionPayload = {
	userId: string;
	role: Role;
};

export type JoiValidator = <T>(schema: ObjectSchema<T>, payload: T) => Promise<void>;
