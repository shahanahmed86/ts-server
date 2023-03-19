import { AdminArgs } from '../../@types/api.type';
import { hashSync } from '../../library/bcrypt.library';
import { ROLE_DATA } from './role.constant';

export const ADMIN_TABLE = 'admin';
export const ADMIN_TABLE_INDEXED_COLUMNS = ['email', 'roleId'];

export const ADMIN_DATA: AdminArgs = {
	email: 'admin@accounts.com.pk',
	password: hashSync('123Abc456'),
	isSuper: true,
	roleId: ROLE_DATA[0]!.id!,
};
