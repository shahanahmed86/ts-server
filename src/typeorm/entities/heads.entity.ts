import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HEAD_TABLE } from '../constants';
import { Base } from './base.entity';
import { Users } from './users.entity';

@Entity(HEAD_TABLE)
export class Heads extends Base {
	@Column()
	name!: string;

	@Column('boolean', { default: true })
	transactable!: boolean;

	@Column('uuid', { nullable: true })
	parentId?: string;

	@ManyToOne(() => Heads, (entity) => entity.children)
	parent?: Heads;

	@OneToMany(() => Heads, (entity) => entity.parent)
	children?: Heads[];

	@ManyToOne(() => Users, (entity) => entity.deletedHeads)
	deletedBy?: Users;
}
