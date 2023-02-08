import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ROLE_TABLE, USER_TABLE } from '../constants';

export class addRoleToUser1675839377922 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			USER_TABLE,
			new TableForeignKey({
				columnNames: [`${ROLE_TABLE}Id`],
				referencedColumnNames: ['id'],
				referencedTableName: ROLE_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(USER_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find(
			(fk) => fk.columnNames.indexOf(`${ROLE_TABLE}Id`) !== -1,
		);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(USER_TABLE, foreignKey);
	}
}
