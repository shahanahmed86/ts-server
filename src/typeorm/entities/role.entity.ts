import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ROLE_TABLE } from '../constants';
import { Admin } from './admin.entity';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity(ROLE_TABLE)
export class Role extends Base {
	@Column()
	name!: string;

	@ManyToOne(() => Admin, (entity) => entity.deletedRoles)
	deletedBy?: Admin;

	@OneToMany(() => User, (entity) => entity.roleId)
	users?: User[];
}
