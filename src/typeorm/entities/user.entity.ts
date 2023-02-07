import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Role } from './role.entity';

@Entity('users')
export class User extends Base {
	@Column()
	firstName?: string;

	@Column()
	lastName?: string;

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
	role!: Role;
}
