import 'express-session';
import { SessionPayload } from '../library.type';

declare module 'express-session' {
	interface Session {
		payload?: SessionPayload | null;
	}
}
