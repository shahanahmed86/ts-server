import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { HEAD_TABLE } from '../constants';

export class addParentToHead1679082225742 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			HEAD_TABLE,
			new TableForeignKey({
				columnNames: ['parentId'],
				referencedColumnNames: ['id'],
				referencedTableName: HEAD_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(HEAD_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('parentId') !== -1);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(HEAD_TABLE, foreignKey);
	}
}
