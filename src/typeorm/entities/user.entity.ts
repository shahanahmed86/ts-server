import { Column, Entity, ManyToOne } from 'typeorm';
import { compareSync } from '../../library/bcrypt.library';
import { USER_TABLE } from '../constants';
import { Admin } from './admin.entity';
import { Base } from './base.entity';
import { Gender } from './gender.entity';
import { Role } from './role.entity';

@Entity(USER_TABLE)
export class User extends Base {
	@Column()
	firstName?: string;

	@Column()
	lastName?: string;

	@Column()
	avatar?: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column('boolean', { default: false })
	emailVerified?: boolean;

	@Column()
	phone?: string;

	@Column('boolean', { default: false })
	phoneVerified?: boolean;

	@Column('uuid')
	roleId!: string;

	@ManyToOne(() => Role, (entity) => entity.users)
	role?: Role;

	@Column('uuid')
	genderId!: string;

	@ManyToOne(() => Gender, (entity) => entity.users)
	gender?: Gender;

	@ManyToOne(() => Admin, (entity) => entity.deletedUsers)
	deletedBy?: Admin;

	// custom hooks
	comparePassword(password: string): boolean {
		return compareSync(password, this.password);
	}
}
