import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { HEAD_TABLE, HEAD_TABLE_INDEXED_COLUMNS } from '../constants';
import base from './base.migration';

export class createHead1679080749500 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: HEAD_TABLE,
				indices: [{ columnNames: HEAD_TABLE_INDEXED_COLUMNS }],
				columns: base.concat([
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'transactable',
						type: 'boolean',
						default: true,
					},
					{
						name: 'parentId',
						type: 'uuid',
						isNullable: true,
					},
				]),
			}),
			true,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(HEAD_TABLE);
	}
}
