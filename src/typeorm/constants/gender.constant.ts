import { DeepPartial } from 'typeorm';
import { Gender } from '../entities/gender.entity';

export const GENDER_TABLE = 'gender';
export const GENDER_TABLE_INDEXED_COLUMNS = ['name'];

export const GENDER_DATA: DeepPartial<Gender[]> = [
	{ id: '04521c7b-a128-4f5f-bfb2-96053c0a31b0', name: 'Male' },
	{ id: '5f3e3914-03ab-49ba-a988-5d46112ac450', name: 'Female' },
	{ id: '740fe07d-1fbe-4bc9-be47-93f3b033288f', name: 'Prefer not to say' },
];
