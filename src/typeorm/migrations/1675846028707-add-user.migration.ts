import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities/user.entity';
import { USER_DATA, USER_TABLE } from '../constants';

export class addUser1675846028707 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(User, USER_TABLE)
			.insert()
			.values(USER_DATA)
			.execute();
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(User, USER_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}
