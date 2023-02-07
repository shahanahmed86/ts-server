import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column()
	firstName?: string;

	@Column()
	lastName?: string;

	@Column()
	email!: string;

	@Column()
	password!: string;

	@Column('boolean', { default: false })
	emailVerified?: boolean;

	@Column()
	phone?: string;

	@Column('boolean', { default: false })
	phoneVerified?: boolean;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: Date;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt?: Date;
}
