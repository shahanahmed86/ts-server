import { Result } from './wrapper.type';

export type FormResponse = <T>(status: number, message: string, data: T) => Result<T>;
