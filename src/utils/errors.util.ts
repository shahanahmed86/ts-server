import { Response } from 'express';
import { formatResponse } from './logics.util';

export class HttpError extends Error {
	public status!: number;
}

export class BadRequest extends HttpError {
	constructor(message = 'Bad Request') {
		super();
		this.status = 400;
		this.message = message;
	}
}

export class NotFound extends HttpError {
	constructor(message = 'Not Found') {
		super();
		this.status = 404;
		this.message = message;
	}
}

export class ConflictError extends HttpError {
	constructor(message = 'Conflict Error') {
		super();
		this.status = 409;
		this.message = message;
	}
}

export class NotAuthorized extends HttpError {
	constructor(message = 'Not Authorized') {
		super();
		this.status = 422;
		this.message = message;
	}
}

export class NotAuthenticated extends HttpError {
	constructor(message = 'Not Authenticated') {
		super();
		this.status = 401;
		this.message = message;
	}
}

export class ServerError extends HttpError {
	constructor(message = 'Something went wrong') {
		super();
		this.status = 500;
		this.message = message;
	}
}

export const restCatch = (e: unknown, res: Response): void => {
	const error = convertUnknownIntoError(e);

	res.locals.error = error;

	const payload = formatResponse<HttpError>(error.status, error.message, error);
	res.status(error.status).send(payload);
};

export const convertUnknownIntoError = (err: unknown): HttpError => {
	let error;

	if (err instanceof HttpError) error = err;
	else if (err instanceof Error) error = new ConflictError(err.message);
	else if (typeof err === 'string' && err) error = new ConflictError(err);
	else error = new ServerError();

	// this will remove inverted commas from an error string
	error.message = error.message.replace(/['"]+/g, '');

	return error;
};

export default {
	BadRequest,
	NotFound,
	ConflictError,
	NotAuthorized,
	NotAuthenticated,
	restCatch,
	convertUnknownIntoError,
};
