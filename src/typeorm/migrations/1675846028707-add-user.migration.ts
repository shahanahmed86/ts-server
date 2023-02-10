import { MigrationInterface, QueryRunner } from 'typeorm';
import { Users } from '../entities/users.entity';
import { USER_DATA, USER_TABLE } from '../constants';

export class addUser1675846028707 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Users, USER_TABLE)
			.insert()
			.values(USER_DATA)
			.execute();
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Users, USER_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}
