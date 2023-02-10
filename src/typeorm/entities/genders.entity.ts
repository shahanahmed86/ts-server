import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GENDER_TABLE } from '../constants';
import { Base } from './base.entity';
import { Users } from './users.entity';

@Entity(GENDER_TABLE)
export class Genders extends Base {
	@Column()
	name!: string;

	@ManyToOne(() => Users, (entity) => entity.deletedGenders)
	deletedBy?: Users;

	@OneToMany(() => Users, (entity) => entity.genderId)
	users?: Users[];
}
