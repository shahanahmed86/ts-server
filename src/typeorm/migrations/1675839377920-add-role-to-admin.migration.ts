import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';
import { ROLE_TABLE, ADMIN_TABLE } from '../constants';

export class addRoleToAdmin1675839377920 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createForeignKey(
			ADMIN_TABLE,
			new TableForeignKey({
				columnNames: ['roleId'],
				referencedColumnNames: ['id'],
				referencedTableName: ROLE_TABLE,
			}),
		);
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		const table = await queryRunner.getTable(ADMIN_TABLE);
		if (!table) return;

		const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('roleId') !== -1);
		if (!foreignKey) return;

		await queryRunner.dropForeignKey(ADMIN_TABLE, foreignKey);
	}
}
