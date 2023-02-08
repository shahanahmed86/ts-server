import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ROLE_TABLE, ROLE_TABLE_INDEXED_COLUMNS } from '../constants';
import base from './base.migration';

export class createRole1675779466160 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: ROLE_TABLE,
				indices: [{ columnNames: ROLE_TABLE_INDEXED_COLUMNS }],
				columns: base.concat([{ name: 'name', type: 'varchar' }]),
			}),
			true,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(ROLE_TABLE);
	}
}
