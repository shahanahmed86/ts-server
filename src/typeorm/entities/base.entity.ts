import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	createdAt?: string;

	@Column({ type: 'timestamp', nullable: true })
	deletedAt?: string;

	@Column({ type: 'uuid', nullable: true })
	deletedById?: string;

	@Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
	updatedAt?: string;
}
