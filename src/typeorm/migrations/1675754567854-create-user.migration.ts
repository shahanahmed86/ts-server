import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { USER_TABLE, USER_TABLE_INDEXED_COLUMNS } from '../constants';
import base from './base.migration';

export class createUser1675754567854 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: USER_TABLE,
				indices: [{ columnNames: USER_TABLE_INDEXED_COLUMNS }],
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
						name: 'avatar',
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
					{
						name: 'roleId',
						type: 'uuid',
					},
					{
						name: 'genderId',
						type: 'uuid',
					},
				]),
			}),
			true,
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(USER_TABLE);
	}
}
