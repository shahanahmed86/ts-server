import { Response } from 'express';
import { translate } from '../library/i18n.library';

export class HttpError extends Error {
	public status!: number;

	generateMessage(message: string | string[]) {
		if (!Array.isArray(message)) return translate(message);

		const [msg, arg] = message;
		return translate(msg, arg);
	}
}

export class BadRequest extends HttpError {
	constructor(message: string | string[] = 'error.badRequest') {
		super();
		this.status = 400;
		this.message = this.generateMessage(message);
	}
}

export class NotFound extends HttpError {
	constructor(message: string | string[] = 'error.notFound') {
		super();
		this.status = 404;
		this.message = this.generateMessage(message);
	}
}

export class ConflictError extends HttpError {
	constructor(message: string | string[] = 'error.conflict') {
		super();
		this.status = 409;
		this.message = this.generateMessage(message);
	}
}

export class NotAuthorized extends HttpError {
	constructor(message: string | string[] = 'error.notAuthorized') {
		super();
		this.status = 422;
		this.message = this.generateMessage(message);
	}
}

export class NotAuthenticated extends HttpError {
	constructor(message: string | string[] = 'error.notAuthenticated') {
		super();
		this.status = 401;
		this.message = this.generateMessage(message);
	}
}

export class InternalError extends HttpError {
	constructor(message: string | string[] = 'error.internalError') {
		super();
		this.status = 500;
		this.message = this.generateMessage(message);
	}
}

export const restCatch = (e: unknown, res: Response): void => {
	const error = convertUnknownIntoError(e);

	res.locals.error = error;

	const payload = { status: error.status, message: error.message, error };
	res.status(error.status).send(payload);
};

export const convertUnknownIntoError = (err: unknown): HttpError => {
	let error;

	if (err instanceof HttpError) error = err;
	else if (err instanceof Error) error = new ConflictError(err.message);
	else if (typeof err === 'string' && err) error = new ConflictError(err);
	else error = new InternalError();

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
