import { Request, Response } from 'express';

export type HasToken = (req: Request) => string | undefined | null;

export type ValidateToken = (bearerToken: string, key: string) => Promise<string>;

export type GuestController = (req: Request) => void;

export type AuthController = (key: string, req: Request, res: Response) => Promise<void>;
