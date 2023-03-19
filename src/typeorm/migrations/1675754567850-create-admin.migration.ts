import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ADMIN_TABLE, ADMIN_TABLE_INDEXED_COLUMNS } from '../constants';
import base from './base.migration';

export class createAdmin1675754567850 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: ADMIN_TABLE,
				indices: [{ columnNames: ADMIN_TABLE_INDEXED_COLUMNS }],
				columns: base.concat([
					{
						name: 'email',
						type: 'varchar',
					},
					{
						name: 'password',
						type: 'varchar',
					},
					{
						name: 'isSuper',
						type: 'boolean',
						default: false,
					},
					{
						name: 'roleId',
						type: 'uuid',
					},
				]),
			}),
			true,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(ADMIN_TABLE);
	}
}
