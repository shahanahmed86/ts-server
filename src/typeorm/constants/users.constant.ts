import { UserArgs } from '../../@types/api.type';
import { hashSync } from '../../library/bcrypt.library';
import { GENDERS_DATA } from './genders.constant';
import { ROLES_DATA } from './roles.constant';

export const USER_TABLE = 'users';
export const USER_TABLE_INDEXED_COLUMNS = ['email', 'phone'];

export const USER_DATA: UserArgs = {
	email: 'admin@accounts.com.pk',
	password: hashSync('123Abc456'),
	roleId: ROLES_DATA[0].id,
	genderId: GENDERS_DATA[0].id,
};
