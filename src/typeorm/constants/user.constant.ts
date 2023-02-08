import { DeepPartial } from 'typeorm';
import { hashSync } from '../../library/bcrypt.library';
import { User } from '../entities/user.entity';
import { GENDERS_DATA } from './gender.constant';
import { ROLES_DATA } from './role.constant';

export const USER_TABLE = 'user';
export const USER_TABLE_INDEXED_COLUMNS = ['email', 'phone'];

export const USER_DATA: DeepPartial<User> = {
	email: 'admin@accounts.com.pk',
	password: hashSync('123Abc456'),
	roleId: ROLES_DATA[0].id,
	genderId: GENDERS_DATA[0].id,
};
