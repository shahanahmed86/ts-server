import { Column, Entity, OneToMany } from 'typeorm';
import { GENDER_TABLE } from '../constants';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity(GENDER_TABLE)
export class Gender extends Base {
	@Column()
	name!: string;

	@OneToMany(() => User, (entity) => entity.genderId)
	users?: User[];
}
