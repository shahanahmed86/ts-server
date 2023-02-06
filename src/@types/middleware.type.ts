import { Request } from 'express';

export type HasToken = (req: Request) => string | undefined | null;
