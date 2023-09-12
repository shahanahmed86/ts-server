import { AnyZodObject } from 'zod';

export type SessionPayload = {
	userId: string;
	role: string;
};

export type ZodValidator<T> = T extends AnyZodObject ? T : AnyZodObject;
