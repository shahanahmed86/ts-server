import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('roles')
export class Role extends Base {
	@Column()
	name!: string;

	@OneToMany(() => User, (entity) => entity.roleId)
	users!: User[];
}
