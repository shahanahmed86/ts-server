import { Request, Response, NextFunction } from 'express';

export type ContextFunction = (
	req: Request,
	res: Response,
	next: NextFunction,
) => void | Promise<void>;

export type Context = {
	req: Request;
	res: Response;
	next: NextFunction;
};

export type Controller<T, S> = (
	root: null | undefined,
	args: T,
	context: Context,
) => S | Promise<S>;

export type Result<T> = {
	status: number;
	message: string;
	data: T;
};
