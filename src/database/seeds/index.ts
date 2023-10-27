import * as Dao from '../../dao';
import { ADMIN_DATA, GENDER_DATA, ROLE_DATA } from '../constants';

export async function seeds() {
	const roleDao = new Dao.Role();
	const roles = ROLE_DATA.map((role) => role.name);
	const areRolesExists = await roleDao.exists({ name: { $in: roles } });
	if (!areRolesExists) {
		for (const ROLE of ROLE_DATA) await roleDao.save(ROLE);
	}

	const genderDao = new Dao.Gender();
	const genders = GENDER_DATA.map((gender) => gender.name);
	const areGendersExists = await genderDao.exists({ name: { $in: genders } });
	if (!areGendersExists) {
		for (const GENDER of GENDER_DATA) await genderDao.save(GENDER);
	}

	const adminDao = new Dao.Admin();
	const isExists = await adminDao.model.exists({ email: ADMIN_DATA.email });
	if (!isExists) await adminDao.save(ADMIN_DATA);
}

export default seeds;
