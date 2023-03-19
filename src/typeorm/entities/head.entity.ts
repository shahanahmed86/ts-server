import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { HEAD_TABLE } from '../constants';
import { Admin } from './admin.entity';
import { Base } from './base.entity';

@Entity(HEAD_TABLE)
export class Head extends Base {
	@Column()
	name!: string;

	@Column('boolean', { default: true })
	transactable!: boolean;

	@Column('uuid', { nullable: true })
	parentId?: string;

	@ManyToOne(() => Head, (entity) => entity.children)
	parent?: Head;

	@OneToMany(() => Head, (entity) => entity.parent)
	children?: Head[];

	@ManyToOne(() => Admin, (entity) => entity.deletedHeads)
	deletedBy?: Admin;
}
