import { JwtPayload } from 'jsonwebtoken';

export type EncodePayload = (key: string, password: string, expiresIn?: string | number) => string;

export type DecodePayload = (token: string) => Promise<string | JwtPayload>;
