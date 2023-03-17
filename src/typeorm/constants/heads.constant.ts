import { DeepPartial } from 'typeorm';
import { Heads } from '../entities/heads.entity';

export const HEAD_TABLE = 'heads';
export const HEAD_TABLE_INDEXED_COLUMNS = ['name', 'transactable', 'parentId'];

export const HEADS_DATA: DeepPartial<Heads[]> = [
	{
		id: 'ece26a28-603c-4dd7-b165-6831d965faa9',
		name: 'Assets',
		transactable: false,
		children: [
			{
				id: '87b79d9d-af61-476a-9959-f86ca82f425b',
				name: 'Current Assets',
				transactable: false,
				children: [
					{
						id: '668d278c-ba02-4bc6-b8b0-fe4a372df305',
						name: 'A/c Receivables',
						transactable: false,
					},
					{
						id: 'f19238a9-d444-4178-bc16-fcf2d7400ba3',
						name: 'Merchandise Inventory',
					},
				],
			},
			{
				id: '68a7fb6b-2f4b-4158-adaa-4c4bf874ed82',
				name: 'Fixed Assets',
				transactable: false,
				children: [
					{ id: 'cef6bd14-566e-49b1-8b22-7532ab8348c3', name: 'Land' },
					{ id: 'd843c7b1-c1b9-4d40-90a6-a640c2b54ac0', name: 'Building' },
				],
			},
		],
	},
	{
		id: 'e23f40e8-6393-4e9b-84a0-81f1947a3918',
		name: 'Expenses',
		transactable: false,
		children: [
			{
				id: 'bc4e0edc-5efe-4760-b4a9-7b0878d30b63',
				name: 'Direct expenses',
				transactable: false,
				children: [{ id: 'cd142e84-7f78-4f40-89c1-1a41dccb11c6', name: 'Purchases' }],
			},
			{
				id: '8e235b0a-0005-4972-b10f-f104faa7700c',
				name: 'Admin expenses',
				transactable: false,
				children: [{ id: '79f7d776-c725-4a4e-a7b4-6e3d685eabb9', name: 'salaries expenses' }],
			},
			{
				id: '0d6da1f9-47a9-4ca9-a3e2-e3ee17f65e8e',
				name: 'Operating expenses',
				transactable: false,
				children: [
					{
						id: '1f5db799-3f07-4fa6-92d1-06eea41d3f93',
						name: 'Utility Bills',
						transactable: false,
						children: [
							{ id: '2ef92632-478b-4f60-968c-a09334524c76', name: 'K-Electric' },
							{ id: '554c23ea-f99b-4c6b-9df1-cb819ad115d9', name: 'SSGC' },
							{ id: 'aa31ab9b-edc9-4e9c-aa98-c3608128da51', name: 'KWSB' },
							{ id: 'ada85565-090d-4a77-a554-14f15d3dd98b', name: 'PTCl' },
						],
					},
				],
			},
		],
	},
	{
		id: '9334f792-fe7c-4a3d-a901-c80bc74068a4',
		name: 'Incomes',
		transactable: false,
		children: [
			{ id: 'caf94d71-ac51-407f-889b-b47c1167a114', name: 'Sales' },
			{ id: 'ebe68c2b-35dd-4eda-b997-60ca96f3eaec', name: 'Purchases discount' },
		],
	},
	{
		id: '4be1684a-b965-4576-8f7b-d64325dcc23f',
		name: 'Liabilities',
		transactable: false,
		children: [
			{
				id: '86bfab30-2ddb-4f8a-aa0b-3d8dc2bc8b8b',
				name: 'Short term liabilities',
				transactable: false,
				children: [
					{ id: '6e477c14-eb7a-418d-9f7d-5e6cf8f88187', name: 'A/c payables', transactable: false },
				],
			},
			{
				id: '1b63b551-9bee-4689-a9c1-ac7f9689458d',
				name: 'Long term liabilities',
				transactable: false,
				children: [{ id: 'db2bbb85-7366-4a7d-a2bc-6890d4baf67c', name: 'Salary tax payables' }],
			},
		],
	},
	{
		id: '4b26ef7b-b62d-4e3c-b0fc-bbb4cbc4fc16',
		name: 'Equity',
		transactable: false,
		children: [
			{ id: '02d01e34-602a-4f21-a46d-93e262a20a89', name: 'Capital' },
			{ id: '6195bbcf-e0bf-436a-8fa6-36369e61a567', name: 'Retained Earnings' },
		],
	},
];
