import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const TABLE_NAME = 'user';
const INDEXED_COLUMNS = ['email', 'phone'];

export class createUser1675754567854 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: TABLE_NAME,
				indices: [{ columnNames: INDEXED_COLUMNS }],
				columns: [
					{
						name: 'id',
						type: 'uuid',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'uuid',
					},
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
					{
						name: 'createdAt',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP',
					},
					{
						name: 'updatedAt',
						type: 'timestamp',
						default: 'CURRENT_TIMESTAMP',
					},
				],
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable(TABLE_NAME);
	}
}
