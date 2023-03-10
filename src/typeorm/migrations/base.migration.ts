import { TableColumnOptions } from 'typeorm';

const base: TableColumnOptions[] = [
	{
		name: 'id',
		type: 'uuid',
		isPrimary: true,
		isGenerated: true,
		generationStrategy: 'uuid',
	},
	{
		name: 'createdAt',
		type: 'timestamp',
		default: 'CURRENT_TIMESTAMP',
	},
	{
		name: 'deletedAt',
		type: 'timestamp',
		isNullable: true,
	},
	{
		name: 'deletedById',
		type: 'uuid',
		isNullable: true,
	},
	{
		name: 'updatedAt',
		type: 'timestamp',
		default: 'CURRENT_TIMESTAMP',
	},
];

export default base;
