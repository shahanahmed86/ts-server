import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { GENDER_TABLE, USER_TABLE } from '../constants';

export class addGenderToUser1675845683450 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			USER_TABLE,
			new TableForeignKey({
				columnNames: [`${GENDER_TABLE}Id`],
				referencedColumnNames: ['id'],
				referencedTableName: GENDER_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(USER_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find(
			(fk) => fk.columnNames.indexOf(`${GENDER_TABLE}Id`) !== -1,
		);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(USER_TABLE, foreignKey);
	}
}
