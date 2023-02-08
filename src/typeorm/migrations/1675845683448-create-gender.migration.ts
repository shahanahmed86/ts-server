import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { GENDER_TABLE, GENDER_TABLE_INDEXED_COLUMNS } from '../constants';
import base from './base.migration';

export class createGender1675845683448 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: GENDER_TABLE,
				indices: [{ columnNames: GENDER_TABLE_INDEXED_COLUMNS }],
				columns: base.concat([{ name: 'name', type: 'varchar' }]),
			}),
			true,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(GENDER_TABLE);
	}
}
