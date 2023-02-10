import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ROLE_TABLE } from '../constants';
import { Base } from './base.entity';
import { Users } from './users.entity';

@Entity(ROLE_TABLE)
export class Roles extends Base {
	@Column()
	name!: string;

	@ManyToOne(() => Users, (entity) => entity.deletedRoles)
	deletedBy?: Users;

	@OneToMany(() => Users, (entity) => entity.roleId)
	users?: Users[];
}
