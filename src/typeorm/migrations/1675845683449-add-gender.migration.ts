import { MigrationInterface, QueryRunner } from 'typeorm';
import { Genders } from '../entities/genders.entity';
import { GENDERS_DATA, GENDER_TABLE } from '../constants';

export class addGender1675845683449 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Genders, GENDER_TABLE)
			.insert()
			.values(GENDERS_DATA)
			.execute();
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Genders, GENDER_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}
