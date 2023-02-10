import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ROLE_TABLE, USER_TABLE } from '../constants';

export class addDeleteByToRole1676039297372 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			ROLE_TABLE,
			new TableForeignKey({
				columnNames: ['deletedById'],
				referencedColumnNames: ['id'],
				referencedTableName: USER_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(ROLE_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('deletedById') !== -1);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(ROLE_TABLE, foreignKey);
	}
}
