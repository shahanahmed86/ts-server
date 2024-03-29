import { NextFunction, Request, Response } from 'express';
import { GraphQLResolveInfo } from 'graphql';

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
	info?: GraphQLResolveInfo,
) => T | Promise<T>;

export type ControllerFunction<T, A> = (
	root: null | undefined,
	args: A,
	context: Context,
	info: GraphQLResolveInfo,
) => T | Promise<T>;
