import { MigrationInterface, QueryRunner } from 'typeorm';
import { Gender } from '../entities/gender.entity';
import { GENDER_DATA, GENDER_TABLE } from '../constants';

export class addGender1675845683449 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Gender, GENDER_TABLE)
			.insert()
			.values(GENDER_DATA)
			.execute();
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Gender, GENDER_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}
