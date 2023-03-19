import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { GENDER_TABLE, ADMIN_TABLE } from '../constants';

export class addDeleteByToGender1676039399280 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			GENDER_TABLE,
			new TableForeignKey({
				columnNames: ['deletedById'],
				referencedColumnNames: ['id'],
				referencedTableName: ADMIN_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(GENDER_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('deletedById') !== -1);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(GENDER_TABLE, foreignKey);
	}
}
