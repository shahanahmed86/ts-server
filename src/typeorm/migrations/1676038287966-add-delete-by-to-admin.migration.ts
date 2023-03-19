import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ADMIN_TABLE } from '../constants';

export class addDeleteByToAdmin1676038287966 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			ADMIN_TABLE,
			new TableForeignKey({
				columnNames: ['deletedById'],
				referencedColumnNames: ['id'],
				referencedTableName: ADMIN_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(ADMIN_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('deletedById') !== -1);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(ADMIN_TABLE, foreignKey);
	}
}
