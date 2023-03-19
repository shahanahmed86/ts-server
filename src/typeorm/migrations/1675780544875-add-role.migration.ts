import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role } from '../entities/role.entity';
import { ROLE_DATA, ROLE_TABLE } from '../constants';

export class addRole1675780544875 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Role, ROLE_TABLE)
			.insert()
			.values(ROLE_DATA)
			.execute();
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Role, ROLE_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}
