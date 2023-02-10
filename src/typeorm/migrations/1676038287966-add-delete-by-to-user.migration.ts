import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { USER_TABLE } from '../constants';

export class addDeleteByToUser1676038287966 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			USER_TABLE,
			new TableForeignKey({
				columnNames: ['deletedById'],
				referencedColumnNames: ['id'],
				referencedTableName: USER_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(USER_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('deletedById') !== -1);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(USER_TABLE, foreignKey);
	}
}
