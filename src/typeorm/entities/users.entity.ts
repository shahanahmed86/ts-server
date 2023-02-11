import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AuthPayload } from '../../@types/api.type';
import { compareSync } from '../../library/bcrypt.library';
import { encodePayload } from '../../library/jwt.library';
import * as redis from '../../library/redis.library';
import { USER_TABLE } from '../constants';
import { Base } from './base.entity';
import { Genders } from './genders.entity';
import { Roles } from './roles.entity';
@Entity(USER_TABLE)
export class Users extends Base {
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

	@ManyToOne(() => Roles, (entity) => entity.users)
	role?: Roles;

	@Column('uuid')
	genderId!: string;

	@ManyToOne(() => Roles, (entity) => entity.users)
	gender?: Roles;

	@ManyToOne(() => Users, (entity) => entity.deletedUsers)
	deletedBy?: Users;

	@OneToMany(() => Users, (entity) => entity.deletedBy)
	deletedUsers?: Users[];

	@OneToMany(() => Genders, (entity) => entity.deletedBy)
	deletedGenders?: Genders[];

	@OneToMany(() => Roles, (entity) => entity.deletedBy)
	deletedRoles?: Roles[];

	// custom hooks
	comparePassword(password: string): boolean {
		return compareSync(password, this.password);
	}

	async postLogin(role: string): Promise<AuthPayload> {
		const user = this;

		const token = encodePayload(role, user.id);
		await redis.AddToken(user.id, token);

		return { token, user };
	}
}
