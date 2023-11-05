import { Role } from '../../dao';
import { ROLE_DATA } from '../constants';
import AppDataSource from '../';

const ROLE_NAMES = ROLE_DATA.map((role) => role.name);

export async function up(): Promise<void> {
	await AppDataSource();

	const roleDao = new Role();

	const isExists = await roleDao.exists({ name: { $in: ROLE_NAMES } });
	if (isExists) return;

	for (const ROLE of ROLE_DATA) await roleDao.save(ROLE);
}

export async function down(): Promise<void> {
	await AppDataSource();

	const roleDao = new Role();

	const roles = await roleDao.findMany({ name: { $in: ROLE_NAMES } });
	if (!roles.length) return;

	for (const role of roles) await roleDao.hardDelete(role._id);
}
