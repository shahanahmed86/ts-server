import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: string;

	@Column({ type: 'timestamp', nullable: true })
	deletedAt?: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt?: string;

	// hooks
	@BeforeInsert()
	_beforeInsert() {
		this.createdAt = new Date().toDateString();
		this.updatedAt = new Date().toDateString();
	}

	@BeforeUpdate()
	_beforeUpdate() {
		this.updatedAt = new Date().toISOString();
	}
}
