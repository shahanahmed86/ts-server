import 'express-session';
import { SessionPayload } from '../common.type';

declare module 'express-session' {
	interface Session {
		payload?: SessionPayload | null;
	}
}
