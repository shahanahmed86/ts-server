import { TableIndex, MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { HEAD_TABLE, USER_TABLE } from '../constants';

const COLUMN_NAME = 'userId';
const COLUMNS = [COLUMN_NAME];

export class addUserToHead1679086351690 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			HEAD_TABLE,
			new TableColumn({
				name: COLUMN_NAME,
				type: 'uuid',
			}),
		);

		await queryRunner.createIndex(HEAD_TABLE, new TableIndex({ columnNames: COLUMNS }));

		await queryRunner.createForeignKey(
			HEAD_TABLE,
			new TableForeignKey({
				columnNames: [COLUMN_NAME],
				referencedColumnNames: ['id'],
				referencedTableName: USER_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(HEAD_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf(COLUMN_NAME) !== -1);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(HEAD_TABLE, foreignKey);

		await queryRunner.dropColumn(HEAD_TABLE, COLUMN_NAME);
	}
}
