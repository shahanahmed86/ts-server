import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AuthPayload } from '../../@types/api.type';
import { compareSync } from '../../library/bcrypt.library';
import { encodePayload } from '../../library/jwt.library';
import { ADMIN_TABLE } from '../constants';
import { Base } from './base.entity';
import { Gender } from './gender.entity';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity(ADMIN_TABLE)
export class Admin extends Base {
	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column('uuid')
	roleId!: string;

	@Column('boolean', { default: false })
	isSuper?: boolean;

	@ManyToOne(() => Role, (entity) => entity.users)
	role?: Role;

	@ManyToOne(() => Admin, (entity) => entity.deletedAdmins)
	deletedBy?: Admin;

	@OneToMany(() => Admin, (entity) => entity.deletedBy)
	deletedAdmins?: Admin[];

	@OneToMany(() => User, (entity) => entity.deletedBy)
	deletedUsers?: User[];

	@OneToMany(() => Gender, (entity) => entity.deletedBy)
	deletedGenders?: Gender[];

	@OneToMany(() => Role, (entity) => entity.deletedBy)
	deletedRoles?: Role[];

	// custom hooks
	comparePassword(password: string): boolean {
		return compareSync(password, this.password);
	}

	async postLogin(role: string): Promise<AuthPayload> {
		const token = encodePayload(role, this.id);

		return { token, user: this };
	}
}
