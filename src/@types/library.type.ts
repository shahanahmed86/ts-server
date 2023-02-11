import { ObjectSchema } from 'joi';
import { JwtPayload } from 'jsonwebtoken';

export type EncodePayload = (key: string, password: string, expiresIn?: string | number) => string;

export type DecodePayload = (token: string) => Promise<JwtPayload>;

export type JoiValidator = <T>(schema: ObjectSchema<T>, payload: T) => Promise<void>;
