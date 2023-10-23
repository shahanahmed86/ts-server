import { DeepPartial } from 'typeorm';
import { Role } from '../schemas/role.schema';

export const ROLE_TABLE = 'role';
export const ROLE_TABLE_INDEXED_COLUMNS = ['name'];

export const ROLE_DATA: DeepPartial<Role[]> = [
	{ id: '81e5a41a-771f-41aa-89cc-1bf8ea120b83', name: 'admin' },
	{ id: '6ab568da-c798-46a6-ac09-bf020ceb1bcf', name: 'user' },
];
