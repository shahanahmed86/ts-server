import { NextFunction, Request, Response } from 'express';

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

export type Result<T> = {
	status: number;
	message: string;
	data: T;
};

export type Controller<T, A> = (
	root: null | undefined,
	args: A,
	context: Context,
) => Result<T> | Promise<Result<T>>;
