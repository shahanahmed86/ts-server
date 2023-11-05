import AppDataSource from '..';
import { Admin } from '../../dao';
import { ADMIN_DATA } from '../constants';

export async function up(): Promise<void> {
	await AppDataSource();

	const adminDao = new Admin();

	const isExists = await adminDao.exists({ email: ADMIN_DATA.email });
	if (isExists) return;

	await adminDao.save(ADMIN_DATA);
}

export async function down(): Promise<void> {
	await AppDataSource();

	const adminDao = new Admin();

	const admin = await adminDao.findOne({ email: ADMIN_DATA.email });
	if (!admin) return;

	await adminDao.hardDelete(admin._id);
}
