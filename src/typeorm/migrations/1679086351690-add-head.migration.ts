import { DeepPartial, MigrationInterface, QueryRunner } from 'typeorm';
import { Heads } from '../entities/heads.entity';
import { HEADS_DATA, HEAD_TABLE } from '../constants';

export class addHead1679086351690 implements MigrationInterface {
	async up(queryRunner: QueryRunner): Promise<void> {
		await runSeeds(queryRunner, HEADS_DATA.slice(0));
	}

	async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager
			.createQueryBuilder(Heads, HEAD_TABLE)
			.delete()
			.where('id IS NOT NULL')
			.execute();
	}
}

async function runSeeds(queryRunner: QueryRunner, _data: DeepPartial<Heads[]>): Promise<void> {
	await queryRunner.manager.createQueryBuilder(Heads, HEAD_TABLE).insert().values(_data).execute();

	for (const data of _data) {
		if (data.children) {
			const l = data.children.length;
			for (let i = 0; i < l; i++) data.children[i].parentId = data.id;

			await runSeeds(queryRunner, data.children);
		}
	}
}
