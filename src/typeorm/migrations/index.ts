import { createUser1675754567854 } from './1675754567854-create-user.migration';
import { createRole1675779466160 } from './1675779466160-create-role.migration';
import { addRole1675780544875 } from './1675780544875-add-role.migration';
import { addRoleToUser1675839377922 } from './1675839377922-add-role-to-user.migration';
import { createGender1675845683448 } from './1675845683448-create-gender.migration';
import { addGender1675845683449 } from './1675845683449-add-gender.migration';
import { addGenderToUser1675845683450 } from './1675845683450-add-gender-to-user.migration';
import { addUser1675846028707 } from './1675846028707-add-user.migration';
import { addDeleteByToUser1676038287966 } from './1676038287966-add-delete-by-to-user.migration';
import { addDeleteByToRole1676039297372 } from './1676039297372-add-delete-by-to-role.migration';
import { addDeleteByToGender1676039399280 } from './1676039399280-add-delete-by-to-gender.migration';

const migrations = [
	createUser1675754567854,
	createRole1675779466160,
	addRole1675780544875,
	addRoleToUser1675839377922,
	createGender1675845683448,
	addGender1675845683449,
	addGenderToUser1675845683450,
	addUser1675846028707,
	addDeleteByToUser1676038287966,
	addDeleteByToRole1676039297372,
	addDeleteByToGender1676039399280,
];

export default migrations;
