import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { SessionPayload } from './library.type';

export type HasSession = (req: Request) => SessionPayload | undefined | null;

export type ValidateToken = (token: string, key: string) => Promise<JwtPayload>;

export type GuestController = (req: Request) => void;

export type AuthController = (role: string, req: Request, res: Response) => Promise<void>;
