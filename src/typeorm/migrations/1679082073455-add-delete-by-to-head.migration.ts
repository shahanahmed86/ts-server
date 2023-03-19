import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { HEAD_TABLE, ADMIN_TABLE } from '../constants';

export class addDeleteByToHead1679082073455 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			HEAD_TABLE,
			new TableForeignKey({
				columnNames: ['deletedById'],
				referencedColumnNames: ['id'],
				referencedTableName: ADMIN_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(HEAD_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('deletedById') !== -1);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(HEAD_TABLE, foreignKey);
	}
}
