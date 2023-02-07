import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../entities/role.entity';

const ROLES = ['admin', 'user'];

export class addRoles1675780544875 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Role, 'roles')
			.insert()
			.values(ROLES.map((name) => ({ name })))
			.execute();
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Role, 'roles')
			.delete()
			.where('name IN (:...name)', { name: ROLES })
			.execute();
	}
}
