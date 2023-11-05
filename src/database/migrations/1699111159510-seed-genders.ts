import AppDataSource from '../';
import { Gender } from '../../dao';
import { GENDER_DATA } from '../constants';

const GENDER_NAMES = GENDER_DATA.map((gender) => gender.name);

export async function up(): Promise<void> {
	await AppDataSource();

	const genderDao = new Gender();

	const isExists = await genderDao.exists({ name: { $in: GENDER_NAMES } });
	if (isExists) return;

	for (const GENDER of GENDER_DATA) await genderDao.save(GENDER);
}

export async function down(): Promise<void> {
	await AppDataSource();

	const genderDao = new Gender();

	const genders = await genderDao.findMany({ name: { $in: GENDER_NAMES } });
	if (!genders.length) return;

	for (const gender of genders) await genderDao.hardDelete(gender._id);
}
