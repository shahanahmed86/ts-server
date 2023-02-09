import { BeforeInsert, Column, Entity, ManyToOne } from 'typeorm';
import { compareSync, hashSync } from '../../library/bcrypt.library';
import { ConflictError } from '../../utils/errors.util';
import { USER_TABLE } from '../constants';
import { Base } from './base.entity';
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

	@ManyToOne(() => Role, (entity) => entity.users)
	gender?: Role;

	// custom hooks
	comparePassword(password: string) {
		const isMatched = compareSync(password, this.password);
		if (!isMatched) throw new ConflictError('Password mismatched');
	}

	// hooks
	@BeforeInsert()
	beforeInsert() {
		this.password = hashSync(this.password);
	}
}
