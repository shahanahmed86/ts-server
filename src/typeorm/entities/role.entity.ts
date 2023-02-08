import { Column, Entity, OneToMany } from 'typeorm';
import { ROLE_TABLE } from '../constants';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity(ROLE_TABLE)
export class Role extends Base {
	@Column()
	name!: string;

	@OneToMany(() => User, (entity) => entity.roleId)
	users?: User[];
}
