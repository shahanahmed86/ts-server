import { AuthPayload } from '../api.type';

declare module 'express-session' {
	interface SessionData {
		user?: AuthPayload | null;
	}
}

export {};
