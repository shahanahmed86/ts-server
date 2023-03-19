import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GENDER_TABLE } from '../constants';
import { Admin } from './admin.entity';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity(GENDER_TABLE)
export class Gender extends Base {
	@Column()
	name!: string;

	@ManyToOne(() => Admin, (entity) => entity.deletedGenders)
	deletedBy?: Admin;

	@OneToMany(() => User, (entity) => entity.genderId)
	users?: User[];
}
