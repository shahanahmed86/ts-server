import { DeepPartial, MigrationInterface, QueryRunner } from 'typeorm';
import { Head } from '../entities/head.entity';
import { HEAD_DATA, HEAD_TABLE } from '../constants';

export class addHead1679086351690 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await runSeeds(queryRunner, HEAD_DATA.slice(0));
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Head, HEAD_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}

async function runSeeds(queryRunner: QueryRunner, _data: DeepPartial<Head[]>): Promise<void> {
	await queryRunner.manager.createQueryBuilder(Head, HEAD_TABLE).insert().values(_data).execute();

	for (const data of _data) {
		if (!data.children || !Array.isArray(data.children)) continue;

		const l = data.children.length;
		for (let i = 0; i < l; i++) data.children[i].parentId = data.id;

		await runSeeds(queryRunner, data.children);
	}
}
