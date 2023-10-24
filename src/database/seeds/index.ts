import * as Dao from '../../dao';
import { ADMIN_DATA, GENDER_DATA, ROLE_DATA } from '../constants';

export async function seeds() {
	const roleDao = new Dao.Role();
	for (const ROLE of ROLE_DATA) {
		const isRoleExists = await roleDao.exists({ name: ROLE.name });
		if (isRoleExists) continue;

		await roleDao.save(ROLE);
	}

	const genderDao = new Dao.Gender();
	for (const GENDER of GENDER_DATA) {
		const isGenderExists = await genderDao.exists({ name: GENDER.name });
		if (isGenderExists) continue;

		await genderDao.save(GENDER);
	}

	const adminDao = new Dao.Admin();
	const isExists = await adminDao.model.exists({ email: ADMIN_DATA.email });
	if (isExists) return;

	await adminDao.save(ADMIN_DATA);
}

export default seeds;
