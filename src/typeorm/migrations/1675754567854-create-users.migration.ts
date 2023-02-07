import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import base from './base.migration';

const TABLE_NAME = 'users';
const INDEXED_COLUMNS = ['email', 'phone'];

export class createUsers1675754567854 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: TABLE_NAME,
				indices: [{ columnNames: INDEXED_COLUMNS }],
				columns: base.concat([
					{
						name: 'firstName',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'lastName',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'email',
						type: 'varchar',
					},
					{
						name: 'password',
						type: 'varchar',
					},
					{
						name: 'emailVerified',
						type: 'boolean',
						default: false,
					},
					{
						name: 'phone',
						type: 'varchar',
						isNullable: true,
					},
					{
						name: 'phoneVerified',
						type: 'boolean',
						default: false,
					},
				]),
			}),
			true,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(TABLE_NAME);
	}
}
