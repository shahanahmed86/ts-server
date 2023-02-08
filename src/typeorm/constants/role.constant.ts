import { DeepPartial } from 'typeorm';
import { Role } from '../entities/role.entity';

export const ROLE_TABLE = 'role';
export const ROLE_TABLE_INDEXED_COLUMNS = ['name'];

export const ROLES_DATA: DeepPartial<Role[]> = [
	{ id: 'c7f3fba9-00fa-4403-824f-295a93d668d9', name: 'admin' },
	{ id: '6ab568da-c798-46a6-ac09-bf020ceb1bcf', name: 'user' },
];
