import { MigrationInterface, QueryRunner } from 'typeorm';
import { Admin } from '../entities/admin.entity';
import { ADMIN_DATA, ADMIN_TABLE } from '../constants';

export class addAdmin1675846028707 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Admin, ADMIN_TABLE)
			.insert()
			.values(ADMIN_DATA)
			.execute();
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Admin, ADMIN_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}
