import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import base from './base.migration';

const TABLE_NAME = 'roles';
const INDEXED_COLUMNS = ['name'];

export class createRoles1675779466160 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: TABLE_NAME,
				indices: [{ columnNames: INDEXED_COLUMNS }],
				columns: base.concat([{ name: 'name', type: 'varchar' }]),
			}),
			true,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(TABLE_NAME);
	}
}
